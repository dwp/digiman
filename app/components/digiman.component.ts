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
import { BlockType } from '../enums/block-type.enum';
import { DigimanDate } from '../enums/digiman-date.enum';
import { DateFieldsComponent } from '../vendor/components/date-fields.component';

export class Digiman {
  private DONE_STATE: string = 'done';
  private START_STATE: string = 'qb-start-id';
  private questionSections: QuestionSection[] = [];
  private state: StateQuestionBlock[] = [];
  private json_meta: State;
  private DEFINITION_ENDPOINT: string;
  private QUESTION_BLOCK_DATA: StateQuestionBlock[] = [];
  private IS_READ_ONLY: boolean;
  private IS_LOAD_ON_CLICK: boolean;
  private STATE_ENDPOINT: string;
  private POST_STATE_ENDPOINT: string;
  private GENERAL_ERROR: string;
  private csrfToken: HTMLInputElement;
  private spinner?: HTMLElement;
  private errorNode: HTMLElement;
  private container: HTMLElement;

  constructor(element: HTMLElement) {
    this.container = element;

    this.IS_READ_ONLY = this.container.dataset.readOnly === "true";
    this.IS_LOAD_ON_CLICK = this.container.dataset.loadOnClick === "true";
    this.STATE_ENDPOINT = this.container.dataset.stateEndpoint;
    this.POST_STATE_ENDPOINT = this.container.dataset.postStateEndpoint;
    this.GENERAL_ERROR = this.container.dataset.generalError;
    this.csrfToken = this.container.querySelector('[name="csrfToken"]');
    this.spinner = (this.container.querySelector('.spinner__template')) ? createElement(this.container.querySelector('.spinner__template').innerHTML) : null;

    if (!this.IS_LOAD_ON_CLICK) {
      this.init();
    } else {
      this.bindLoadEvents();
    }
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
    this.questionSections.push(new QuestionSection(qs as QuestionSectionInterface));
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
      this.renderSection(this.getQuestionSectionById(this.START_STATE as string).html as string);
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

    qs.updateView();

    this.renderSection(qs.html as string);

    let nextSection = this.getNextSection(nextSectionId as string, sections as StateQuestionBlock[]);
    if (nextSection) {
      this.renderQuestionSection(nextSection, this.removeSectionItem(currentSectionId as string, sections as StateQuestionBlock[]));
    } else if (nextSectionId !== this.DONE_STATE) {
      this.renderSection(this.getQuestionSectionById(nextSectionId as string).html as string);
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
    delegateEvent(this.container, 'click', 'input[type="radio"], input[type="checkbox"]', this.handleClick.bind(this));
    delegateEvent(this.container, 'blur', 'textarea, input[type="text"], input[type="tel"]', this.handleBlur.bind(this), { useCapture: true });
    delegateEvent(this.container, 'click', '.date-picker__link', this.handleDatePickerClick.bind(this));
    delegateEvent(this.container, 'input', 'input[type="tel"]', this.handleNumericInput.bind(this));
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

      const day: HTMLInputElement = this.container.querySelector(`#id-section-${dateFieldsId} .day`);
      const month: HTMLInputElement = this.container.querySelector(`#id-section-${dateFieldsId} .month`);
      const year: HTMLInputElement = this.container.querySelector(`#id-section-${dateFieldsId} .year`);

      this.updateDateBlockDay(dateBlock, day.value);
      this.updateDateBlockMonth(dateBlock, month.value);
      this.updateDateBlockYear(dateBlock, year.value);

      dateBlock.updateValue();
    }
  }

  handleBlur(e: Event) {
    const target = e.target;
    let qsNode = returnAncestorWithClass(target, 'question-section');

    if (qsNode && qsNode.dataset.currentState) {
      this.updateFormBlockState(target as HTMLInputElement, qsNode.dataset.currentState as string);
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

  handleClick(e: Event) {
    const target = e.target as HTMLInputElement;
    const qsNode: HTMLElement = returnAncestorWithClass(target, 'question-section');
    const newNextStateId: string = target.dataset.nextSectionId;
    const newOptionId: string = target.dataset.optionId;
    const oldNextStateId: string = qsNode.dataset.nextState;
    const oldOptionId: string = qsNode.dataset.selectedOptionId;
    const isSameFlow: boolean = this.isSameFlow(
      {
        newNextStateId: newNextStateId,
        oldNextStateId: oldNextStateId,
        newOptionId: newOptionId,
        oldOptionId: oldOptionId
      } as DigimanStateCheck
    );

    //if target is a decision block
    if (newNextStateId) {
      //only update when target is a checkbox OR radio and current state and next state are not the same
      if (target.type === 'checkbox' || (target.type === 'radio' && !isSameFlow)) {
        this.handleDecisionBlockClick({
          newNextStateId: newNextStateId,
          oldNextStateId: oldNextStateId,
          qsNode: qsNode,
          isChecked: target.checked,
          optionId: newOptionId
        } as DigimanStateProgress);
      }

    } else {
      this.updateFormBlockState(target as HTMLInputElement, qsNode.dataset.currentState as string);
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
    this.sendState();
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
    qs.updateView();

    //isChecked ensures that decisionBlock of type CHECKBOX is not rendering next question block
    if (isChecked) {
      qsNode.setAttribute('data-next-state', nextSectionId);

      if (optionId) {
        qsNode.setAttribute('data-selected-option-id', optionId);
      }

      if (nextSectionId !== this.DONE_STATE) {
        if (nextSectionId && nextSectionId.trim().length > 0) {
          this.renderSection(this.getQuestionSectionById(nextSectionId).html);
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
    //question section can be null for the Last Block with "done" questionBlockId
    //nextSection can be undefined for uncompleted question sections
    //nextSection can be an empty string for modified question sections
    while (qs && qs.decisionBlock.nextSection && qs.decisionBlock.nextSection.trim().length > 0) {
      nextState = qs.decisionBlock.nextSection;

      //don't reset form blocks for the clicked question section
      if (currentQsId !== qs.id) {
        qs.resetAllFormBlocksState();
        qs.updateView();
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

  updateFormChoices(qs: QuestionSection, formFields: StateFormBlock[]) {
    formFields.forEach((field) => {
      let formBlock = qs.getContentBlockById(field.id as string) as ValueBlock | OptionBlock | DateBlock;
      
      if (formBlock.type === BlockType.DATE) {
        this.setDateFormBlockState(formBlock as DateBlock, field.value as number);
      } else {
        this.setFormBlockState(formBlock as OptionBlock, field.value as string, true);
      }
    });
  }

  setDateFormBlockState(formBlock: DateBlock, value: number) {
    formBlock.setState(value as number);
  }

  setFormBlockState(formBlock: OptionBlock, value: string, checked: boolean) {
    formBlock.setState(value as string, checked);
  }

  updateFormBlockState(target: HTMLInputElement, qsId: string) {
    let qs: QuestionSection = this.getQuestionSectionById(qsId as string);
    let formBlock = qs.getContentBlockById(target.name as string) as ValueBlock | OptionBlock | DateBlock;

    if (formBlock.type === BlockType.DATE) {
      this.updateDateBlockState(formBlock as DateBlock, target);
    } else {
      this.setFormBlockState(formBlock as OptionBlock, target.value as string, target.checked as boolean);
    }
  }

  updateDateBlockState(dateBlock: DateBlock, target: HTMLInputElement) {
    if (target.dataset.type === DigimanDate.DAY) {
      this.updateDateBlockDay(dateBlock, target.value);
    } else if (target.dataset.type === DigimanDate.MONTH) {
      this.updateDateBlockMonth(dateBlock, target.value);
    } else if (target.dataset.type === DigimanDate.YEAR) {
      this.updateDateBlockYear(dateBlock, target.value);
    }

    dateBlock.updateValue();
  }

  updateDateBlockDay(dateBlock: DateBlock, value: string) {
    dateBlock.day = value;
  }

  updateDateBlockMonth(dateBlock: DateBlock, value: string) {
    dateBlock.month = value;
  }

  updateDateBlockYear(dateBlock: DateBlock, value: string) {
    dateBlock.year = value;
  }

  renderSection(section: string) {
    let sectionNode: HTMLElement = createElement(section as string);
    this.container.append(sectionNode);

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

  sendState() {
    let stateData = {
      'definitionType': this.json_meta.definitionType,
      'definitionVersion': this.json_meta.definitionVersion,
      'agentTodoId': this.json_meta.agentTodoId,
      'questionBlockData': this.state
    }

    FetchService.fetchData(
      {
        type: 'POST',
        url: this.POST_STATE_ENDPOINT,
        body: JSON.stringify(stateData),
        csrfToken: this.csrfToken.value,
        contentType: 'application/json',
        acceptHeader: '*/*'
      }
    );
  }

  handleModelSuccessResponse(json: DefinitionMeta) {
    if (json) {
      this.container.setAttribute('aria-busy', 'false');
      this.buildQuestionSections(json.questionBlocks as QuestionSectionInterface[]);

      this.clearContainer();
      this.renderQuestionSections(this.QUESTION_BLOCK_DATA as StateQuestionBlock[]);
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
