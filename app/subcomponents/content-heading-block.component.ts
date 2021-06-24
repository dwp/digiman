import blockBuilder from '../services/block-builder.service';
import { ContentBlock } from './content-block.component';
import { ContentHeadingBlockInterface } from '../interfaces/content-heading-block.interface';

export class ContentHeadingBlock extends ContentBlock {
  private _hasIntroductionHeading: boolean;
  private _isSectionWithIntroductionHeading: boolean;

  constructor(data: ContentHeadingBlockInterface) {
    super(data);

    this._hasIntroductionHeading = data.hasIntroductionHeading;
    this._isSectionWithIntroductionHeading = data.isSectionWithIntroductionHeading;
  }

  get hasIntroductionHeading(): boolean {
    return this._hasIntroductionHeading;
  }

  get isSectionWithIntroductionHeading(): boolean {
    return this._isSectionWithIntroductionHeading;
  }
}
