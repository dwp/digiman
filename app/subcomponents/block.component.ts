import { BlockType } from '../enums/block-type.enum';

export abstract class Block {
  private _type: BlockType;
  private _htmlNode: HTMLElement;

  constructor(type: BlockType) {
    if (this.constructor.name === 'Block') {
      throw new TypeError('Abstract class "Block" cannot be instantiated directly.');
    }

    this._htmlNode = null;
    this._type = type;
  }

  get htmlNode(): HTMLElement {
    return this._htmlNode;
  }

  set htmlNode(newHtml: HTMLElement) {
    this._htmlNode = newHtml;
  }

  get type(): BlockType {
    return this._type;
  }
}
