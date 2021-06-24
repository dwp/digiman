import { QuestionSection } from '../subcomponents/question-section.component';
import { ValueBlock } from '../subcomponents/value-block.component';
import { DateBlock } from '../subcomponents/date-block.component';
import { OptionBlock } from '../subcomponents/option-block.component';
import { createElement, delegateEvent, returnAncestorWithClass } from '../vendor/utils/index.utils';
import { FetchService } from '../services/fetch.service';
import stateService from '../services/state.service';
import windowService from '../services/window.service';
import { QuestionSectionInterface } from '../interfaces/question-section.interface';
import { StateQuestionBlock } from '../interfaces/state-question-block.interface';
import { DefinitionMeta } from '../interfaces/definition-meta.interface';
import { State } from '../interfaces/state.interface';
import { DigimanStateCheck } from '../interfaces/digiman-state-check.interface';
import { DigimanStateProgress } from '../interfaces/digiman-state-progress.interface';
import { StateFormBlock } from '../interfaces/state-form-block.interface';
import { DigimanMode } from '../enums/digiman-mode.enum';
import { DigimanState } from '../enums/digiman-state.enum';
import { DateFieldsComponent } from '../vendor/components/date-fields.component';
import debounce from '../utils/debounce.utils';
import { BlockType } from '../enums/block-type.enum';
import { AddMoreBlock } from '../subcomponents/add-more-block.component';
import { ValueInterface } from '../interfaces/value.interface';
import { SelectBlock } from '../subcomponents/select-block.component';
import { CheckboxBlock } from '../subcomponents/checkbox-block.component';
import { RadioBlock } from '../subcomponents/radio-block.component';
import { QuestionSectionViewFactory } from './question-section-view-factory.component';

export class Digiman {
  private START_STATE: string = 'qb-start-id';
  private questionSections: QuestionSection[] = [];
  private state: StateQuestionBlock[] = [];
  private json_meta: State;
  private DEFINITION_ENDPOINT: string;
  private QUESTION_BLOCK_DATA: StateQuestionBlock[] = [];
  private IS_READ_ONLY: boolean;
  private IS_LOAD_ON_CLICK: boolean;
  private AUTO_SAVE_ON_COMPLETION: boolean; 
  private AUTO_SAVE_ON_COMPLETION_ENABLED: boolean; 
  private STATE_ENDPOINT: string;
  private POST_STATE_ENDPOINT: string;
  private GENERAL_ERROR: string;
  private csrfToken: HTMLInputElement;
  private spinner?: HTMLElement;
  private errorNode: HTMLElement;
  private container: HTMLElement;
  private debouncedSendState: Function;
  private formElement: HTMLFormElement;
  private statusCallInProgress: boolean = false;
  private completionQuery: string = '?postCompletionState=true';
  private _hasIntroductionHeading: boolean = false;
  private questionSectionViewFactory: QuestionSectionViewFactory = new QuestionSectionViewFactory();

  constructor(element: HTMLElement) {
    this.container = element;

    this.IS_READ_ONLY = this.container.dataset.readOnly === "true";
    this.IS_LOAD_ON_CLICK = this.container.dataset.loadOnClick === "true";
    this.AUTO_SAVE_ON_COMPLETION = this.container.dataset.autoSaveOnCompletion === "true";
    this.STATE_ENDPOINT = this.container.dataset.stateEndpoint;
    this.POST_STATE_ENDPOINT = this.container.dataset.postStateEndpoint;
    this.GENERAL_ERROR = this.container.dataset.generalError;
    this.csrfToken = this.container.querySelector('[name="csrfToken"]');
    this.spinner = (this.container.querySelector('.spinner__template')) ? createElement(this.container.querySelector('.spinner__template').innerHTML) : null;
    this.debouncedSendState = debounce(this.sendState.bind(this, this.postCompletionQuery), 300);

    if (!this.IS_LOAD_ON_CLICK) {
      this.init();
    } else {
      this.bindLoadEvents();
    }
  }

  get postCompletionQuery() {
    return (this.AUTO_SAVE_ON_COMPLETION_ENABLED) ? this.completionQuery : '';
  }

  init() {
    if (windowService.checkStubData()) {
      let definition: DefinitionMeta;
      let state: State;
      const digimanConfig: any = windowService.getFirstDigiman();

      definition = digimanConfig.definition;
      state = digimanConfig.state;

      windowService.removeDigiman(digimanConfig.type);

      this.loadDataFromWindow(state as State, definition as DefinitionMeta);
    } else if (this.STATE_ENDPOINT && this.STATE_ENDPOINT.length > 0) {
      this.fetchState();

      if (!this.IS_READ_ONLY) {
        this.bindEvents();
      }
    }
  }

  /**
  * Creates an unique ID on the parent DOM in order to enable more digiman on one page
  **/
  createUniqueId(): string {
    const readOrEdit: string = this.IS_READ_ONLY ? DigimanMode.READ : DigimanMode.EDIT;
    return `${this.json_meta.definitionType}-${this.json_meta.definitionVersion}-${readOrEdit}`;
  }

  loadDataFromWindow(state: State, definition: DefinitionMeta) {
    this.json_meta = {
      definitionType: state.definitionType,
      definitionVersion: state.definitionVersion,
      agentTodoId: state.agentTodoId
    }

    this.container.id = this.createUniqueId();

    this.QUESTION_BLOCK_DATA = state.questionBlockData;

    this.handleModelSuccessResponse(definition as DefinitionMeta);
    this.bindEvents();
  }

  createQuestionSection(qs: QuestionSectionInterface) {
    qs.readOnly = this.IS_READ_ONLY;
    qs.hasIntroductionHeading = this._hasIntroductionHeading;
    this.questionSections.push(new QuestionSection(qs as QuestionSectionInterface));
  }

  hasIntroductionHeading(sections: QuestionSectionInterface[]) {
    const firstSection = sections.find(section => section.id === this.START_STATE);

    if (firstSection.contents && firstSection.contents[0] && firstSection.contents[0].type === BlockType.HEADING) {
      this._hasIntroductionHeading = true;
    }
  }

  buildQuestionSections(sections: QuestionSectionInterface[]) {
    for (let i=0; i<sections.length; i++) {
      sections[i].digimanId = this.container.id;
      this.createQuestionSection(sections[i] as QuestionSectionInterface);
    }
  }

  renderQuestionSections(sections: StateQuestionBlock[]) {
    //display starting point
    if (!sections || sections.length === 0) {
      const qsView = this.questionSectionViewFactory.createView(this.getQuestionSectionById(this.START_STATE as string));
      this.renderSection(qsView);
    } else if (sections && sections.length > 0) {
      let startingSection = sections.find(section => section.questionBlockId === this.START_STATE);

      this.renderQuestionSection(startingSection, sections);
    }
  }

  renderQuestionSection(section: StateQuestionBlock, sections: StateQuestionBlock[]) {
    let currentSectionId: string = section.questionBlockId;
    let nextSectionId: string = section.answerId;
    let optionId: string = section.optionId;
    let nextOptionId: string = (optionId) ? `${nextSectionId}-${optionId}` : `${nextSectionId}`;
    let qs: QuestionSection = this.getQuestionSectionById(currentSectionId);

    qs.decisionBlock.setState(nextOptionId as string, true);

    if (section.data) {
      this.updateFormChoices(qs as QuestionSection, section.data as StateFormBlock[]);
    }

    const qsView = this.questionSectionViewFactory.createView(qs);

    this.renderSection(qsView);

    let nextSection = this.getNextSection(nextSectionId as string, sections as StateQuestionBlock[]);
    if (nextSection) {
      this.renderQuestionSection(nextSection, this.removeSectionItem(currentSectionId as string, sections as StateQuestionBlock[]));
    } else if (nextSectionId !== DigimanState.DONE) {
      const qsView = this.questionSectionViewFactory.createView(this.getQuestionSectionById(nextSectionId as string));
      this.renderSection(qsView);
    } else if (nextSectionId === DigimanState.DONE) {
      if (this.AUTO_SAVE_ON_COMPLETION) {
        this.AUTO_SAVE_ON_COMPLETION_ENABLED = true;
      }
    }
  }

  getNextSection(nextSectionId: string, sections: StateQuestionBlock[]) {
    return sections.find(section => section.questionBlockId === nextSectionId)
  }

  removeSectionItem(currentSectionId: string, sections: StateQuestionBlock[]) {
    return sections.filter(section => section.questionBlockId !== currentSectionId)
  }

  loadDigiman() {
    //if definition enpoint is defined - the data has been loaded
    if (!this.DEFINITION_ENDPOINT) {
      this.init();
    }
  }

  bindEvents() {
    delegateEvent(this.container, 'click', 'input[type="radio"].digiman__radio--decision-block, input[type="checkbox"].digiman__checkbox--decision-block', this.handleDecisionClick.bind(this));
    delegateEvent(this.container, 'click', 'input[type="radio"].digiman__radio--content-block, input[type="checkbox"].digiman__checkbox--content-block', this.handleClick.bind(this));
    delegateEvent(this.container, 'change', 'select.digiman__select', this.handleChange.bind(this));
    delegateEvent(this.container, 'blur', 'textarea, input[type="text"], input[type="tel"]', this.handleBlur.bind(this), { useCapture: true });
    delegateEvent(this.container, 'click', '.date-picker__link', this.handleDatePickerClick.bind(this));
    delegateEvent(this.container, 'input', 'input[type="tel"]', this.handleNumericInput.bind(this));

    if (this.AUTO_SAVE_ON_COMPLETION) {
      delegateEvent(document.querySelector('body'), 'submit', 'form', this.handleFormSubmit.bind(this));
    }
  }

  bindLoadEvents() {
    let body: HTMLElement = document.querySelector('body');
    delegateEvent(body, 'click', '#digiman-loader .expand-help__button', this.loadDigiman.bind(this));
  }

  handleNumericInput(e: Event) {
    const regex = new RegExp('[^0-9.]', 'g');
    const input = e.target as HTMLInputElement;
    const caretPos = input.selectionStart - 1;
    const inputValue = input.value;

    if (regex.test(inputValue)) {
      input.value = inputValue.replace(regex, '');
      input.setSelectionRange(caretPos, caretPos);
    }
  }

  handleDatePickerClick(e: Event) {
    const target = e.target as HTMLInputElement;
    const qsNode: HTMLElement = returnAncestorWithClass(target, 'question-section');
    const dateFields: HTMLElement = returnAncestorWithClass(target, 'govuk-date-input');
    const dateFieldsId: string = dateFields.dataset.id;

    if (qsNode && qsNode.dataset.currentState) {
      const qs: QuestionSection = this.getQuestionSectionById(qsNode.dataset.currentState as string);
      const dateBlock: DateBlock = qs.getContentBlockById(dateFieldsId) as DateBlock;
      const oldValue: number = dateBlock.value;

      const day: HTMLInputElement = this.container.querySelector(`#id-section-${dateFieldsId} .day`);
      const month: HTMLInputElement = this.container.querySelector(`#id-section-${dateFieldsId} .month`);
      const year: HTMLInputElement = this.container.querySelector(`#id-section-${dateFieldsId} .year`);

      dateBlock.day = day.value;
      dateBlock.month = month.value;
      dateBlock.year = year.value;

      dateBlock.updateValue();

      if (this.AUTO_SAVE_ON_COMPLETION_ENABLED && dateBlock.value !== oldValue) {
        this.state = stateService(this.questionSections as QuestionSection[]);
        this.debouncedSendState(this.postCompletionQuery);
      }
    }
  }

  handleBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    let qsNode = returnAncestorWithClass(target, 'question-section');
    
    if (qsNode && qsNode.dataset.currentState) {
      let childId = null;
      let formBlock = this.findFormBlock(qsNode.dataset.currentState as string, target.name as string) as ValueBlock | DateBlock | AddMoreBlock;
      const currentValue = (formBlock instanceof DateBlock) ? formBlock.getDateBlockState(target.dataset.type) : formBlock.value;

      if (formBlock instanceof AddMoreBlock) {
        childId = target.id;
      }

      if (currentValue !== target.value) {
        this.updateFormBlockState(formBlock, target.value, target.dataset.type, target.checked, childId);
        this.saveState();
      }
    }
  }

  findFormBlock(questionSectionId: string, contentBlockId: string) {
    const qs: QuestionSection = this.getQuestionSectionById(questionSectionId);
    return qs.getContentBlockById(contentBlockId) as ValueBlock | OptionBlock | DateBlock | AddMoreBlock;
  }

  saveState() {
    if (this.AUTO_SAVE_ON_COMPLETION_ENABLED) {
      //set statusCallInProgress to true before debounce delay is applied
      this.statusCallInProgress = true;
      this.state = stateService(this.questionSections as QuestionSection[]);
      console.log(this.state);
      this.debouncedSendState(this.postCompletionQuery);
    }
  }

  isSameFlow(state: DigimanStateCheck) {
    let isSameState = state.oldNextStateId === state.newNextStateId;

    //if option id is defined, make another check
    if (state.oldOptionId && isSameState) {
      isSameState = state.newOptionId === state.oldOptionId
    }

    return isSameState;
  }

  handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const qsNode: HTMLElement = returnAncestorWithClass(target, 'question-section');

    let qs: QuestionSection = this.getQuestionSectionById(qsNode.dataset.currentState as string);
    let formBlock = qs.getContentBlockById(target.name as string) as RadioBlock | CheckboxBlock;

    this.updateFormBlockState(formBlock, target.value, target.dataset.type, true, null);
    this.saveState();
  }

  handleDecisionClick(e: Event) {
    const target = e.target as HTMLInputElement;
    const qsNode: HTMLElement = returnAncestorWithClass(target, 'question-section');
    const newNextStateId: string = target.dataset.nextSectionId;
    const newOptionId: string = target.dataset.optionId;
    const oldNextStateId: string = qsNode.dataset.nextState;
    const oldOptionId: string = qsNode.dataset.selectedOptionId;
    const isEndState: boolean = newNextStateId === DigimanState.DONE;
    const isSameFlow: boolean = this.isSameFlow(
      {
        newNextStateId: newNextStateId,
        oldNextStateId: oldNextStateId,
        newOptionId: newOptionId,
        oldOptionId: oldOptionId
      } as DigimanStateCheck
    );

    //only update when target is a checkbox OR radio and current state and next state are not the same
    if (target.type === 'checkbox' || (target.type === 'radio' && !isSameFlow)) {
      this.handleDecisionBlockClick({
        newNextStateId: newNextStateId,
        oldNextStateId: oldNextStateId,
        qsNode: qsNode,
        isChecked: target.checked,
        optionId: newOptionId
      } as DigimanStateProgress);

      document.body.dispatchEvent(new CustomEvent('digiman-decision-block-click'));
      this.removeErrorsFromHiddenDecisionBlocks();

      if (this.AUTO_SAVE_ON_COMPLETION && isEndState) {
        this.AUTO_SAVE_ON_COMPLETION_ENABLED = target.checked;
      } else if (this.AUTO_SAVE_ON_COMPLETION && !isEndState) {
        this.AUTO_SAVE_ON_COMPLETION_ENABLED = false;
      }
    }
  }

  // on any decision click, clear out the errors
  removeErrorsFromHiddenDecisionBlocks() {
    this.questionSections.forEach(qs => {
      const decisionBlock = qs.decisionBlock;
      /*
      if (this.nextSection.trim() === '' && this.htmlNode.classList.contains('has-errors')) {
        this.htmlNode.classList.remove('has-errors');
        this.htmlNode.querySelector('.govuk-error-message').innerHTML = '';
      }*/
    });
  }

  handleClick(e: Event) {
    const target = e.target as HTMLInputElement;
    const qsNode: HTMLElement = returnAncestorWithClass(target, 'question-section');

    let qs: QuestionSection = this.getQuestionSectionById(qsNode.dataset.currentState as string);
    let formBlock = qs.getContentBlockById(target.name as string) as RadioBlock | CheckboxBlock;

    if (formBlock.type === BlockType.CHECKBOX) {
      this.updateFormBlockState(formBlock, target.value, target.dataset.type, target.checked, null);
      this.saveState();
    } else if (formBlock.type === BlockType.RADIO) {
      let selectedOption: any = formBlock.options.find((option) => {
        return option.selected
      });

      if (selectedOption === undefined || selectedOption.value !== target.value) {
        this.updateFormBlockState(formBlock, target.value, target.dataset.type, target.checked, null);
        this.saveState();
      }
    }
  }

  /**
  * @method handleDecisionBlockClick
  * @param {Object} options
  **/
  handleDecisionBlockClick(options: DigimanStateProgress) {
    if (options.oldNextStateId && options.oldNextStateId.trim().length > 0) {
      this.resetStateTree(options.qsNode.dataset.currentState);
    }

    this.setNextState(options.qsNode, options.newNextStateId, options.isChecked, options.optionId);

    //only build state on decision click
    this.state = stateService(this.questionSections as QuestionSection[]);

    //make a call to send state
    this.debouncedSendState(this.postCompletionQuery);
  }

  /**
   * @method setNextState
   * @param {Object} qsNode                    Currently modified question section DOM node.
   * @param {string} nextSectionId             ID of the next section to be rendered
   * @param {string} optionId                  ID of the selected option
   *
   * Modify the currently selected object state and render next section
   */
  setNextState(qsNode: HTMLElement, nextSectionId: string, isChecked: boolean, optionId: string) {
    //change current question section's decision block option
    let qs: QuestionSection = this.getQuestionSectionById(qsNode.dataset.currentState as string);
    let nextOptionId: string = (optionId) ? `${nextSectionId}-${optionId}` : `${nextSectionId}`;

    qs.decisionBlock.setState(nextOptionId, isChecked);

    //isChecked ensures that decisionBlock of type CHECKBOX is not rendering next question block
    if (isChecked) {
      qsNode.setAttribute('data-next-state', nextSectionId);

      if (optionId) {
        qsNode.setAttribute('data-selected-option-id', optionId);
      }

      if (nextSectionId !== DigimanState.DONE) {
        if (nextSectionId && nextSectionId.trim().length > 0) {
          const qsView = this.questionSectionViewFactory.createView(this.getQuestionSectionById(nextSectionId));
          this.renderSection(qsView);
        }
      }
    } else {
      qsNode.setAttribute('data-next-state', '');
    }
  }

  /**
   * @method resetStateTree
   * @param {Object} questionSection          Currently modified question section DOM node.
   *
   * Loop through question section's decision blocks,
   * re-setting data and removing question sections from DOM
   */
  resetStateTree(currentQsId: string) {
    let qs: QuestionSection = this.getQuestionSectionById(currentQsId as string);
    let nextState: string;
    let nextQuestionSectionNode: HTMLElement;

    //while loop checks:
    //question section will only be null for the Last Block with "done" questionBlockId or empty nextState
    while (qs) {
      nextState = qs.decisionBlock.nextSection;

      //don't reset form blocks for the clicked question section
      if (currentQsId !== qs.id) {
        qs.resetAllFormBlocksState();
      }

      nextQuestionSectionNode = this.container.querySelector(`[data-current-state="${nextState}"]`);

      if (nextQuestionSectionNode) {
        this.removeSection(nextQuestionSectionNode as HTMLElement);
      }

      qs = this.getQuestionSectionById(nextState);
    }
  }

  getQuestionSectionById(sectionId: string) {
    return this.questionSections.find(section => section.id === sectionId);
  }

  /**
   * Update the form block on the load from the state data
   * @param qs 
   * @param formFields 
   */
  updateFormChoices(qs: QuestionSection, formFields: StateFormBlock[]) {
    formFields.forEach((field) => {
      let formBlock = qs.getContentBlockById(field.id as string) as ValueBlock | CheckboxBlock | RadioBlock | SelectBlock | DateBlock | AddMoreBlock;
    
      this.updateFormBlockState(formBlock, field.value, null, true, null);
    });
  }

  /**
   * Update of form block
   * @param target 
   * @param formBlock 
   */
  updateFormBlockState(formBlock: ValueBlock | DateBlock | CheckboxBlock | RadioBlock | SelectBlock | AddMoreBlock, value: string | number | Array<Array<ValueInterface>>, type: string, isChecked: boolean, childId: string) {
    if (formBlock instanceof DateBlock) {
      formBlock.setState(value, type);
    } else if (formBlock instanceof ValueBlock) {
      formBlock.setState(value as string);
    } else if (formBlock instanceof AddMoreBlock) {
      if (childId) {
        formBlock.setChildState(value as string, childId);
      } else {
        formBlock.setState(value as Array<Array<ValueInterface>>);
      }
    } else if (formBlock instanceof SelectBlock) {
      formBlock.setState(value as string);
    } else {
      formBlock.setState(value as string, isChecked);
    }
  }

  renderSection(sectionNode: HTMLElement) {
    this.container.append(sectionNode);
    this.initialiseDatePicker(sectionNode);
  }

  initialiseDatePicker(sectionNode: HTMLElement) {
    //only run if datepicker component is injected to the page
    let selector = '.govuk-date-input';
    let dateFields = sectionNode.querySelectorAll(selector);

    if (dateFields && dateFields.length > 0) {
      for (let i=0; i < dateFields.length; i++) {
        new DateFieldsComponent({ selector: selector, config: {} }, dateFields[i] as HTMLElement);
      }
    }
  }

  removeSection(section: HTMLElement) {
    this.container.removeChild(section as HTMLElement);
  }

  fetchModel() {
    FetchService.fetchData({
      contentType: 'application/json',
      csrfToken: this.csrfToken.value,
      type: 'GET',
      url: this.DEFINITION_ENDPOINT
    }).then((response: any) => {
      if (response.status <= 308) {
        return response.json();
      } else {
        this.handleError();
      }
    })
    .then((json: DefinitionMeta) => {
      this.handleModelSuccessResponse(json as DefinitionMeta);
    })
    .catch((err: any) => {
      window.console.log(err);
      this.handleError();
    });
  }

  fetchState() {
    this.showLoadState();

    FetchService.fetchData({
      contentType: 'application/json',
      csrfToken: this.csrfToken.value,
      type: 'GET',
      url: this.STATE_ENDPOINT
    }).then((response: any) => {
      if (response.status <= 308) {
        return response.json();
      } else {
        this.handleError();
      }
    })
    .then((json: State) => {
      this.handleStateSuccessResponse(json as State);
    })
    .catch((err: any) => {
      window.console.log(err);
      this.handleError();
    });
  }

  sendState(thisArg: any, [...queryParameters]: string[]) {
    let stateData = {
      'definitionType': this.json_meta.definitionType,
      'definitionVersion': this.json_meta.definitionVersion,
      'agentTodoId': this.json_meta.agentTodoId,
      'questionBlockData': this.state
    }

    FetchService.fetchData(
      {
        type: 'POST',
        url: this.POST_STATE_ENDPOINT + queryParameters,
        body: JSON.stringify(stateData),
        csrfToken: this.csrfToken.value,
        contentType: 'application/json',
        acceptHeader: '*/*'
      }
    ).then(() => {
      this.statusCallInProgress = false;
      if (this.AUTO_SAVE_ON_COMPLETION_ENABLED && this.formElement) {  
        this.formElement.submit();
      }

      if (this.state.find(qb => qb.answerId === 'done')) {
        this.container.classList.add('digiman--completed');
      } else {
        this.container.classList.remove('digiman--completed');
      }
    });
  }

  handleFormSubmit(e: Event) {
    if (this.AUTO_SAVE_ON_COMPLETION_ENABLED && this.statusCallInProgress) {
      e.preventDefault();

      this.formElement = e.target as HTMLFormElement;
    }
  }

  handleModelSuccessResponse(json: DefinitionMeta) {
    if (json) {
      this.container.setAttribute('aria-busy', 'false');
      this.hasIntroductionHeading(json.questionBlocks as QuestionSectionInterface[]);
      this.buildQuestionSections(json.questionBlocks as QuestionSectionInterface[]);

      this.clearContainer();
      this.renderQuestionSections(this.QUESTION_BLOCK_DATA as StateQuestionBlock[]);
      this.state = stateService(this.questionSections as QuestionSection[]);

      if (this.state.find(qb => qb.answerId === 'done')) {
        this.container.classList.add('digiman--completed');
      }
    } else {
      this.handleError();
    }
  }

  handleStateSuccessResponse(json: State) {
    if (json) {
      this.json_meta = {
        definitionType: json.definitionType,
        definitionVersion: json.definitionVersion,
        agentTodoId: json.agentTodoId
      }

      this.container.id = this.createUniqueId();

      this.DEFINITION_ENDPOINT = `/digiman/definition/${json.definitionType}/${json.definitionVersion}`;
      this.QUESTION_BLOCK_DATA = json.questionBlockData;

      this.fetchModel();
    } else {
       this.handleError();
     }
  }

  //General error
  handleError() {
    let refreshButton: HTMLElement;
    let errorHTML: string = `<div class="alert alert--warning text">
                               <p>${this.GENERAL_ERROR}</p>
                               <div><input type="button" class="digiman__refresh-button link-style" value="Try again" /></div>
                             </div>`;
    this.errorNode = createElement(errorHTML);

    this.clearContainer();
    this.container.classList.remove('panel');
    this.container.setAttribute('aria-busy', 'false');
    this.container.append(this.errorNode as HTMLElement);

    refreshButton = this.container.querySelector('.digiman__refresh-button');
    refreshButton.addEventListener('click', this.reloadDigiman.bind(this));
  }

  reloadDigiman() {
    this.container.classList.add('panel');
    this.errorNode.remove();
    this.init();
  }

  showLoadState() {
    this.clearContainer();
    if (this.spinner) {
      this.container.append(this.spinner as HTMLElement);
    }
    this.container.setAttribute('aria-busy', 'true');
  }

  clearContainer() {
    this.container.innerHTML = '';
  }
}
