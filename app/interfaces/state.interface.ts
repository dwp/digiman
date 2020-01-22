import { StateQuestionBlock } from '../interfaces/state-question-block.interface';

export interface State {
  definitionType: string,
  definitionVersion: string,
  agentTodoId: string,
  questionBlockData?: StateQuestionBlock[]
}