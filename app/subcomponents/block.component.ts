import { BlockType } from '../enums/block-type.enum';

export abstract class Block {
  private _type: BlockType;
  private _html: string;

  constructor(type: BlockType) {
    if (this.constructor.name === 'Block') {
      throw new TypeError('Abstract class "Block" cannot be instantiated directly.');
    }

    this._html = null;
    this._type = type;
  }

  get html(): string {
    return this._html;
  }

  set html(newHtml: string) {
    this._html = newHtml;
  }

  get type(): BlockType {
    return this._type;
  }
}
