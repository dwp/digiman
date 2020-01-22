import { StateFormBlock } from './state-form-block.interface';

export interface StateQuestionBlock {
  answerId: string,
  questionBlockId: string,
  optionId?: string,
  data?: StateFormBlock[]
}