import { QuestionSectionInterface } from './question-section.interface';

export interface DefinitionMeta {
  agentTodoId: string,
  definitionType: string,
  definitionVersion: string,
  questionBlocks?: QuestionSectionInterface[]
}