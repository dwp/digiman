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
import { BlockType } from '../enums/block-type.enum';

export class QuestionSection {

  private _contentBlocks: (ValueBlock | ContentBlock | OptionBlock | DateBlock)[] = [];
  private _decisionBlock: DecisionBlock;
  private _html: string;
  private _readOnly: boolean;
  private _id: string;
  private _digimanId: string;

  constructor(data: QuestionSectionInterface) {
    this._html = null;
    this._readOnly = data.readOnly;
    this._id = data.id;
    this._digimanId = data.digimanId;

    this._init(data.contents as (ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface)[], data.question as DecisionBlockInterface);
  }

  get html(): string {
    return this._html;
  }

  get readOnly(): boolean {
    return this._readOnly;
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
    this._html = this._createView();
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
    this._createContentBlocks(content as (ValueBlock | ContentBlock | OptionBlock | DateBlock)[]);

    // create one decision block for object (radio)
    if (questions) {
      this._createDecisionBlock(questions as DecisionBlockInterface);
    }

    // create HTML string
    this.updateView();
  }

  _createDecisionBlock(blockData: DecisionBlockInterface) {
    blockData.readOnly = this.readOnly;
    this._decisionBlock = new DecisionBlock(blockData);
  }

  _createContentBlocks(blocks: (ValueBlock | ContentBlock | OptionBlock | DateBlock)[]) {
    for (let block of blocks) {
      if (block.type === BlockType.TEXT_INPUT || block.type === BlockType.TEXTAREA) {
        this._createValueBlock(block as ValueBlockInterface);
      } else if (block.type === BlockType.CHECKBOX || block.type === BlockType.RADIO) {
        this._createOptionBlock(block as OptionBlockInterface);
      } else if (block.type === BlockType.DATE) {
        this._createDateBlock(block as DateBlockInterface);
      } else {
        this._createContentBlock(block as ContentBlockInterface);
      }
    }
  }

  _createValueBlock(block: ValueBlockInterface) {
    block.readOnly = this.readOnly;
    this._contentBlocks.push(new ValueBlock(block as ValueBlockInterface));
  }

  _createDateBlock(block: DateBlockInterface) {
    block.readOnly = this.readOnly;
    this._contentBlocks.push(new DateBlock(block as DateBlockInterface));
  }

  _createOptionBlock(block: OptionBlockInterface) {
    block.readOnly = this.readOnly;
    this._contentBlocks.push(new OptionBlock(block as OptionBlockInterface));
  }

  _createContentBlock(block: ContentBlockInterface) {
    this._contentBlocks.push(new ContentBlock(block as ContentBlockInterface));
  }

  _createView(): string {
    let startHtml = `<div class="question-section" id="${this._digimanId}__${this.id}" data-current-state="${this.id}" data-next-state="${this.decisionBlock.nextSection}" data-selected-option-id="${this.decisionBlock.selectedOptionId}">`;
    let endHtml = '</div>'

    //create html per each block
    this.contentBlocks.forEach((block) => {
      startHtml += block.html;
    });

    //add html for decisions
    if (this.decisionBlock && this.decisionBlock.html) {
      startHtml += this.decisionBlock.html;
    }

    return startHtml + endHtml;
  }
}
