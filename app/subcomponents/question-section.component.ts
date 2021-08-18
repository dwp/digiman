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
import { AddMoreBlockInterface } from '../interfaces/add-more-block.interface';
import { AddMoreBlock } from './add-more-block.component';
import { SelectBlock } from './select-block.component';
import { RadioBlock } from './radio-block.component';
import { CheckboxBlock } from './checkbox-block.component';
import { DecisionCheckboxBlock } from './decision-checkbox-block.component';
import { DecisionRadioBlock } from './decision-radio-block.component';
import { LinkBlockInterface } from '../interfaces/link-block.interface';
import { LinkBlock } from './link-block.component';

export class QuestionSection {

  private _contentBlocks: (ValueBlock | ContentBlock | SelectBlock | RadioBlock | CheckboxBlock | DateBlock | AddMoreBlock | LinkBlock)[] = [];
  private _decisionBlock: DecisionCheckboxBlock | DecisionRadioBlock;
  private _readOnly: boolean;
  private _id: string;
  private _digimanId: string;
  private _blockFactory: BlockFactory;
  private _hasIntroductionHeading: boolean;
  private _isSectionWithIntroductionHeading: boolean;

  constructor(data: QuestionSectionInterface) {
    this._readOnly = data.readOnly;
    this._hasIntroductionHeading = data.hasIntroductionHeading;
    this._isSectionWithIntroductionHeading = false;
    this._id = data.id;
    this._digimanId = data.digimanId;
    this._blockFactory = new BlockFactory();

    this._init(data.contents as (ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface | AddMoreBlockInterface | LinkBlockInterface)[], data.question as DecisionBlockInterface);
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

  get decisionBlock(): DecisionRadioBlock | DecisionCheckboxBlock {
    return this._decisionBlock;
  }

  get contentBlocks() {
    return this._contentBlocks;
  }

  get id(): string {
    return this._id;
  }

  get digimanId(): string {
    return this._digimanId;
  }

  getContentBlockById(id: String): ValueBlock | ContentBlock | SelectBlock | RadioBlock | CheckboxBlock | DateBlock | AddMoreBlock | LinkBlock {
    let contentBlock = this.contentBlocks.find(block => {
      if (block instanceof FormBlock || block instanceof AddMoreBlock) {
        return block.id === id;
      }
    });

    if (!contentBlock) {
      contentBlock = this.contentBlocks
        .filter(block => block.type === "ADD_MORE")
        .find((addMoreBlock: AddMoreBlock) => addMoreBlock.blocks
          .find((childrenBlocks: ValueBlock[]) => childrenBlocks
            .find((child: ValueBlock) => child.id === id)))
    }

    return contentBlock;
  }

  resetAllFormBlocksState() {
    this.decisionBlock.resetState();

    this.contentBlocks.forEach(formBlock => {
      if (formBlock instanceof FormBlock || formBlock instanceof AddMoreBlock) {
        formBlock.resetState();
      }
    });
  }

  _init(content: (ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface | AddMoreBlockInterface | LinkBlockInterface)[], questions: DecisionBlockInterface) {    
    // create block for each object in content[]
    this._createContentBlocks(content);

    // create one decision block for object (radio)
    if (questions) {
      this._createDecisionBlock(questions);
    }
  }

  _createDecisionBlock(block: DecisionBlockInterface) {
    this._decisionBlock = this._blockFactory.createDecisionBlock(block, this.readOnly);
  }

  _createContentBlocks(blocks: Array<(ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface | AddMoreBlockInterface | LinkBlockInterface)>) {
    blocks.forEach((block, index) => {
      this._isSectionWithIntroductionHeading = this._hasIntroductionHeading && this._id === 'qb-start-id' && index === 0;
      this._contentBlocks.push(this._blockFactory.createContentBlock(block, this.readOnly, this._hasIntroductionHeading, this._isSectionWithIntroductionHeading));
    });
  }
}
