import blockBuilder from '../services/block-builder.service';
import { Block } from './block.component';
import { BlockType } from '../enums/block-type.enum';
import { ContentBlockInterface } from '../interfaces/content-block.interface';

export class ContentBlock extends Block {
  private _content: string | string[];

  constructor(data: ContentBlockInterface) {
    super(data.type as BlockType);

    this._content = data.content;

    this.updateView();
  }

  get content(): string | string[] {
    return this._content;
  }

  updateView() {
    this.html = blockBuilder(this as ContentBlock);
  }
}
