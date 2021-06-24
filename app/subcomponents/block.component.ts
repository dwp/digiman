import { BlockType } from '../enums/block-type.enum';

export abstract class Block {
  private _type: BlockType;

  constructor(type: BlockType) {
    if (this.constructor.name === 'Block') {
      throw new TypeError('Abstract class "Block" cannot be instantiated directly.');
    }

    this._type = type;
  }

  get type(): BlockType {
    return this._type;
  }
}
