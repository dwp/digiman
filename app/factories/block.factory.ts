import { BlockType } from '../enums/block-type.enum';
import { DecisionBlock } from '../subcomponents/decision-block.component';
import { OptionBlock } from '../subcomponents/option-block.component';
import { ValueBlock } from '../subcomponents/value-block.component';
import { DateBlock } from '../subcomponents/date-block.component';
import { ContentBlock } from '../subcomponents/content-block.component';
import { ContentBlockInterface } from '../interfaces/content-block.interface';
import { DecisionBlockInterface } from '../interfaces/decision-block.interface';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { ValueBlockInterface } from '../interfaces/value-block.interface';
import { DateBlockInterface } from '../interfaces/date-block.interface';
import { ContentHeadingBlockInterface } from '../interfaces/content-heading-block.interface';
import { ContentHeadingBlock } from '../subcomponents/content-heading-block.component';
import { AddMoreBlock } from '../subcomponents/add-more-block.component';
import { AddMoreBlockInterface } from '../interfaces/add-more-block.interface';

export class BlockFactory {

  createContentBlock(blockData: (ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface | AddMoreBlockInterface), isReadOnly: boolean, hasIntroductionHeading: boolean, isSectionWithIntroductionHeading: boolean) {
    let block: (ValueBlock | OptionBlock | ContentBlock | DateBlock | AddMoreBlock);

    if (blockData.type === BlockType.TEXT_INPUT || blockData.type === BlockType.TEXTAREA) {
      block = this._createValueBlock(blockData as ValueBlockInterface, isReadOnly as boolean);
    } else if (blockData.type === BlockType.CHECKBOX || blockData.type === BlockType.RADIO) {
      block = this._createOptionBlock(blockData as OptionBlockInterface, isReadOnly as boolean);
    } else if (blockData.type === BlockType.DATE) {
      block = this._createDateBlock(blockData as DateBlockInterface, isReadOnly as boolean);
    } else if (blockData.type === BlockType.HEADING) {
      block = this._createContentHeadingBlock(blockData as ContentHeadingBlockInterface, hasIntroductionHeading, isSectionWithIntroductionHeading);
    } else if (blockData.type === BlockType.ADD_MORE) {
      block = this._createAddMoreBlock(blockData as AddMoreBlockInterface, isReadOnly as boolean);
    } else {
      block = this._createContentBlock(blockData as ContentBlockInterface);
    }

    return block;
  }

  createDecisionBlock(block: DecisionBlockInterface, isReadOnly: boolean) {
    block.readOnly = isReadOnly;
    return new DecisionBlock(block);
  }

  _createAddMoreBlock(block: AddMoreBlockInterface, isReadOnly: boolean) {
    block.readOnly = isReadOnly;
    return new AddMoreBlock(block as AddMoreBlockInterface);
  }

  _createValueBlock(block: ValueBlockInterface, isReadOnly: boolean) {
    block.readOnly = isReadOnly;
    return new ValueBlock(block as ValueBlockInterface);
  }

  _createDateBlock(block: DateBlockInterface, isReadOnly: boolean) {
    block.readOnly = isReadOnly;
    return new DateBlock(block as DateBlockInterface);
  }

  _createOptionBlock(block: OptionBlockInterface, isReadOnly: boolean) {
    block.readOnly = isReadOnly;
    return new OptionBlock(block as OptionBlockInterface);
  }

  _createContentHeadingBlock(block: ContentHeadingBlockInterface, hasIntroductionHeading: boolean, isSectionWithIntroductionHeading: boolean) {
    block.hasIntroductionHeading = hasIntroductionHeading;
    block.isSectionWithIntroductionHeading = isSectionWithIntroductionHeading;
    return new ContentHeadingBlock(block as ContentHeadingBlockInterface);
  }

  _createContentBlock(block: ContentBlockInterface) {
    return new ContentBlock(block as ContentBlockInterface);
  }
}
