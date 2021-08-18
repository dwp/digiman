import { DecisionBlockInterface } from '../interfaces/decision-block.interface';
import { ContentBlockInterface } from '../interfaces/content-block.interface';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { ValueBlockInterface } from '../interfaces/value-block.interface';
import { DateBlockInterface } from './date-block.interface';
import { AddMoreBlockInterface } from './add-more-block.interface';
import { LinkBlockInterface } from './link-block.interface';

export interface QuestionSectionInterface {
     hasIntroductionHeading: boolean;
     contents: (ValueBlockInterface | OptionBlockInterface | ContentBlockInterface | DateBlockInterface | AddMoreBlockInterface | LinkBlockInterface)[],
     id: string,
     question: DecisionBlockInterface,
     readOnly: boolean,
     title?: string,
     digimanId: string
}