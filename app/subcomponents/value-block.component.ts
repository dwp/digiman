import blockBuilder from '../services/block-builder.service';
import { FormBlock } from './form-block.component';
import { ValueBlockInterface } from '../interfaces/value-block.interface';
import { BlockType } from '../enums/block-type.enum';

export class ValueBlock extends FormBlock {
  private _value: string;

  constructor(data: ValueBlockInterface) {
    super(data as ValueBlockInterface);

    this._value = '';

    this.htmlNode = blockBuilder(this as ValueBlock);
  }

  get value(): string {
    return this._value;
  }

  set value(newValue: string) {
    this._value = newValue;
  }

  setState(value: string) {
    this.value = value;
    this.updateView();
  }

  resetState() {
    this.value = '';
    this.updateView();
  }

  updateView() {
    if (this.readOnly) {
      const paragraph: HTMLElement = this.htmlNode.querySelector('.digiman__value-input--read-only');
      paragraph.innerHTML = this.value;
    } else {
      const input: HTMLInputElement = this.htmlNode.querySelector('.digiman__value-input');
      input.value = this.value;

      if (this.type === BlockType.TEXTAREA) {
        input.innerHTML = this.value;
      }
    }
  }
}
