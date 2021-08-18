import blockBuilder from '../services/block-builder.service';
import { LinkBlockInterface } from '../interfaces/link-block.interface';
import { Block } from './block.component';
import { BlockType } from '../enums/block-type.enum';
import { ContentBlock } from './content-block.component';
import { ContentBlockInterface } from '../interfaces/content-block.interface';

export class LinkBlock extends ContentBlock {
  private _url: string;

  constructor(data: LinkBlockInterface) {
    super({type: data.type, content: data.content} as ContentBlockInterface);

    this._url = data.url;
  }

  get url(): string {
    return this._url;
  }
}
