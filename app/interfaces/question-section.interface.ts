import { DecisionBlockInterface } from '../interfaces/decision-block.interface';
import { ContentBlockInterface } from '../interfaces/content-block.interface';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { ValueBlockInterface } from '../interfaces/value-block.interface';

export interface QuestionSectionInterface {
     hasIntroductionHeading: boolean;
     contents: (ContentBlockInterface | OptionBlockInterface | ValueBlockInterface)[],
     id: string,
     question: DecisionBlockInterface,
     readOnly: boolean,
     title?: string,
     digimanId: string
}