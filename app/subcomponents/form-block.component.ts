import { Block } from './block.component';
import { BlockType } from '../enums/block-type.enum';
import { FormBlockInterface } from '../interfaces/form-block.interface';

export abstract class FormBlock extends Block {
  private _readOnly: boolean;
  private _id: string;
  private _label: string;
  private _hint: string;

  constructor(data: FormBlockInterface) {
    super(data.type as BlockType);

    if (this.constructor.name === 'FormBlock') {
      throw new TypeError('Abstract class "FormBlock" cannot be instantiated directly.');
    }

    this._readOnly = data.readOnly;
    this._id = data.id;
    this._label = data.label;
    this._hint = data.hint;
  }

  get readOnly(): boolean {
    return this._readOnly;
  }

  get id(): string {
    return this._id;
  }

  get hint(): string {
    return this._hint;
  }

  set hint(hint) {
    this._hint = hint;
  }

  get label(): string {
    return this._label;
  }
}
