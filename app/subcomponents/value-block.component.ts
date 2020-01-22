import blockBuilder from '../services/block-builder.service';
import { FormBlock } from './form-block.component';
import { ValueBlockInterface } from '../interfaces/value-block.interface';

export class ValueBlock extends FormBlock {
  private _value: string;

  constructor(data: ValueBlockInterface) {
    super(data as ValueBlockInterface);

    this._value = '';

    this.updateView();
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
    this.html = blockBuilder(this as ValueBlock);
  }
}
