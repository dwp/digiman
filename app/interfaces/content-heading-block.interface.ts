import { ContentBlockInterface } from './content-block.interface';

export interface ContentHeadingBlockInterface extends ContentBlockInterface {
  hasIntroductionHeading: boolean,
  isSectionWithIntroductionHeading: boolean
}