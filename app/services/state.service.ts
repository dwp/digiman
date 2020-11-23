import { OptionBlock } from '../subcomponents/option-block.component';
import { ValueBlock } from '../subcomponents/value-block.component';
import { ContentBlock } from '../subcomponents/content-block.component';
import { DateBlock } from '../subcomponents/date-block.component';
import { QuestionSection } from '../subcomponents/question-section.component';
import { OptionInterface } from '../interfaces/option.interface';
import { StateFormBlock } from '../interfaces/state-form-block.interface';
import { StateQuestionBlock } from '../interfaces/state-question-block.interface';
import { AddMoreBlock } from '../subcomponents/add-more-block.component';
import { ValueInterface } from '../interfaces/value.interface';

/**
 * @method stateService
 *
 * Build the current state obj of each questionBlock. The decisionBlock radio must be selected to build that questionBlock's state.
 */
export default function stateService(questionSections: QuestionSection[]): StateQuestionBlock[] {
  let sectionState: StateQuestionBlock[] = [];

  for (let i=0; i<questionSections.length; i++) {
    let qs: QuestionSection = questionSections[i];
    const qsId: string = qs.id;
    const qsAnswer: string = qs.decisionBlock.nextSection;
    let options: OptionInterface[] = qs.decisionBlock.options;

    // each radio in the decisionBlock
    for (let j=0; j<options.length; j++) {
      let option: OptionInterface = options[j];

      if (option.selected === true) {
        let qsState: any = {};
        let qsData: StateFormBlock[] = [];

        qsState.questionBlockId = qsId;
        qsState.answerId = qsAnswer;

        //backward compatibility
        if (option.optionId) {
          qsState.optionId = option.optionId;
        }

        qsData = buildDataState(qs as QuestionSection);

        if (qsData.length) {
          qsState.data = qsData;
        }
        sectionState.push(qsState);
      }
    }
  }

  return sectionState;
}

/**
 * @method buildDataState
 * @param {Object} qs                        The questionSection obj
 *
 * Build an obj of each form block's id and value if checkbox is selected or text/textrea has a value
 */
export function buildDataState(qs: QuestionSection): StateFormBlock[] {
  let dataState: StateFormBlock[] = [];
  let contentBlocks: (OptionBlock|ValueBlock|ContentBlock|DateBlock|AddMoreBlock)[] = qs.contentBlocks;

  for (let i=0; i<contentBlocks.length; i++) {
    let contentBlock: (OptionBlock|ValueBlock|ContentBlock|DateBlock|AddMoreBlock) = contentBlocks[i];

    if (contentBlock instanceof OptionBlock) {
      let options: OptionInterface[] = contentBlock.options;

      for (let j=0; j<options.length; j++) {
        let checkboxOption: OptionInterface = options[j];
        if (checkboxOption.selected === true) {
          dataState.push(buildFormBlockState(contentBlock.id as string, checkboxOption.value as string));
        }
      }
    }
    else if (contentBlock instanceof DateBlock) {
      if (contentBlock.value) {
        dataState.push(buildFormBlockState(contentBlock.id as string, contentBlock.value as number));
      }
    }
    else if (contentBlock instanceof ValueBlock) {
      if (contentBlock.value) {
        dataState.push(buildFormBlockState(contentBlock.id as string, contentBlock.value as string));
      }
    }
    else if (contentBlock instanceof AddMoreBlock) {
      dataState.push(buildFormBlockState(contentBlock.id as string, contentBlock.value as Array<Array<ValueInterface>>));
    }
  }
  
  return dataState;
}

/**
 * @method buildFormBlockState
 * @param {Object} blockId              The contentBlock id
 * @param {string} blockValue           The value of the form input
 *
 * Build an obj of each form input's id and value
 */
export function buildFormBlockState(blockId: string, blockValue: string | number | Array<Array<ValueInterface>>) {
  return {
    id: blockId,
    value: blockValue
  }
}