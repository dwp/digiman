import { OptionBlockInterface } from './option-block.interface';

export interface DecisionBlockInterface extends OptionBlockInterface {
     nextSection: string,
     selectedOptionId: string
}