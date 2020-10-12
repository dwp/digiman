import { DecisionBlock } from './decision-block.component';
import { OptionBlock } from './option-block.component';
import { ValueBlock } from './value-block.component';
import { FormBlock } from './form-block.component';
import { DateBlock } from './date-block.component';
import { ContentBlock } from './content-block.component';
import { DecisionBlockInterface } from '../interfaces/decision-block.interface';
import { ContentBlockInterface } from '../interfaces/content-block.interface';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { ValueBlockInterface } from '../interfaces/value-block.interface';
import { DateBlockInterface } from '../interfaces/date-block.interface';
import { QuestionSectionInterface } from '../interfaces/question-section.interface';
import { BlockFactory } from '../factories/block.factory';
import { createElement } from '../vendor/utils/index.utils';

export class QuestionSection {

  private _contentBlocks: (ValueBlock | ContentBlock | OptionBlock | DateBlock)[] = [];
  private _decisionBlock: DecisionBlock;
  private _readOnly: boolean;
  private _id: string;
  private _digimanId: string;
  private _htmlNode: HTMLElement;
  private _blockFactory: BlockFactory;
  private _hasIntroductionHeading: boolean;
  private _isSectionWithIntroductionHeading: boolean;

  constructor(data: QuestionSectionInterface) {
    this._htmlNode = null;
    this._readOnly = data.readOnly;
    this._hasIntroductionHeading = data.hasIntroductionHeading;
    this._isSectionWithIntroductionHeading = false;
    this._id = data.id;
    this._digimanId = data.digimanId;
    this._blockFactory = new BlockFactory();

    this._init(data.contents as (ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface)[], data.question as DecisionBlockInterface);
  }

  get htmlNode(): HTMLElement {
    return this._htmlNode;
  }

  get hasIntroductionHeading(): boolean {
    return this._hasIntroductionHeading;
  }

  get readOnly(): boolean {
    return this._readOnly;
  }

  set readOnly(readOnly: boolean) {
    this._readOnly = readOnly;
  }

  get decisionBlock(): DecisionBlock {
    return this._decisionBlock;
  }

  get contentBlocks(): (ValueBlock | ContentBlock | OptionBlock | DateBlock)[] {
    return this._contentBlocks;
  }

  get id(): string {
    return this._id;
  }

  getContentBlockById(id: String): ValueBlock | ContentBlock | OptionBlock | DateBlock {
    return this.contentBlocks.find(block => {
      if (block instanceof FormBlock) {
        return block.id === id;
      }
    });
  }

  /**
  * @method updateView
  * Builds the HTML for the question section object out of content blocks and decision block
  **/
  updateView() {
    this._htmlNode = this._createView();
  }

  resetAllFormBlocksState() {
    this.decisionBlock.resetState();

    this.contentBlocks.forEach(formBlock => {
      if (formBlock instanceof FormBlock) {
        formBlock.resetState();
      }
    });
  }

  _init(content: (ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface)[], questions: DecisionBlockInterface) {    
    // create block for each object in content[]
    this._createContentBlocks(content);

    // create one decision block for object (radio)
    if (questions) {
      this._createDecisionBlock(questions);
    }

    this.updateView();
  }

  _createDecisionBlock(block: DecisionBlockInterface) {
    this._decisionBlock = this._blockFactory.createDecisionBlock(block, this.readOnly);
  }

  _createContentBlocks(blocks: (ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface)[]) {
    blocks.forEach((block, index) => {
      this._isSectionWithIntroductionHeading = this._hasIntroductionHeading && this._id === 'qb-start-id' && index === 0;
      this._contentBlocks.push(this._blockFactory.createContentBlock(block, this.readOnly, this._hasIntroductionHeading, this._isSectionWithIntroductionHeading));
    });
  }

  _createView(): HTMLElement {
    let questionNode = createElement(`<div class="question-section" id="${this._digimanId}__${this.id}" data-current-state="${this.id}" data-next-state="${this.decisionBlock.nextSection}" data-selected-option-id="${this.decisionBlock.selectedOptionId}"></div>`);

    //create html per each block
    for (let block of this.contentBlocks) {
      questionNode.append(block.htmlNode);
    }

    //add html for decisions
    if (this.decisionBlock && this.decisionBlock.htmlNode) {
      questionNode.append(this.decisionBlock.htmlNode);
    }

    return questionNode;
  }
}
