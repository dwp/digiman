import blockBuilder from '../services/block-builder.service';
import { LinkBlockInterface } from '../interfaces/link-block.interface';
import { Block } from './block.component';
import { BlockType } from '../enums/block-type.enum';

export class LinkBlock extends Block {
  private _url: string;
  private _text: any;

  constructor(data: LinkBlockInterface) {
    super(data.type as BlockType);

    this._url = data.url;
    this._text = data.text;
    
    this.updateView();
  }

  get url(): string {
    return this._url;
  }

  get text(): string {
    return this._text;
  }

  updateView() {
    this.htmlNode = blockBuilder(this as LinkBlock);
  }
}
