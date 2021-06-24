import { createElement } from "../vendor/utils/index.utils";
import { ContentBlock } from "../subcomponents/content-block.component";
import { DecisionCheckboxBlock } from "../subcomponents/decision-checkbox-block.component";
import { DecisionRadioBlock } from "../subcomponents/decision-radio-block.component";
import { QuestionSection } from "../subcomponents/question-section.component";
import { ValueBlock } from "../subcomponents/value-block.component";
import { SelectBlock } from "../subcomponents/select-block.component";
import { RadioBlock } from "../subcomponents/radio-block.component";
import { CheckboxBlock } from "../subcomponents/checkbox-block.component";
import { DateBlock } from "../subcomponents/date-block.component";
import { AddMoreBlock } from "../subcomponents/add-more-block.component";
import { LinkBlock } from "../subcomponents/link-block.component";
import blockBuilder from "../services/block-builder.service";
import { BlockType } from "../enums/block-type.enum";
import { AddMoreBlockView } from "./add-more-block-view.component";

export class QuestionSectionViewFactory {
  private addMoreBlockViewFactory: AddMoreBlockView = new AddMoreBlockView();

  createView(questionSection: QuestionSection): HTMLElement {
    const digimanId: string = questionSection.digimanId;
    const id: string = questionSection.id;
    const decisionBlock: DecisionRadioBlock | DecisionCheckboxBlock = questionSection.decisionBlock;
    const contentBlocks: Array<ContentBlock | ValueBlock | SelectBlock | RadioBlock | CheckboxBlock | DateBlock | AddMoreBlock | LinkBlock> = questionSection.contentBlocks;

    let questionNode = createElement(`<div class="question-section" id="${digimanId}__${id}" data-current-state="${id}" data-next-state="${decisionBlock.nextSection}" data-selected-option-id="${decisionBlock.selectedOptionId}"></div>`);

    //create html per each block
    for (let block of contentBlocks) {
      if (block.type === BlockType.ADD_MORE) {
        questionNode.append(this.addMoreBlockViewFactory.createView(block as AddMoreBlock));
      } else {
        questionNode.append(blockBuilder(block as ContentBlock | ValueBlock | SelectBlock | RadioBlock | CheckboxBlock | DateBlock | LinkBlock));
      }
    }

    //add html for decisions
    if (decisionBlock) {
      questionNode.append(blockBuilder(decisionBlock));
    }

    return questionNode;
  }
}