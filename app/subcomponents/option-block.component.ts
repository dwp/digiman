import { FormBlock } from './form-block.component';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { OptionInterface } from '../interfaces/option.interface';

export abstract class OptionBlock extends FormBlock {
  private _options: OptionInterface[];

  constructor(data: OptionBlockInterface) {
    super(data as OptionBlockInterface);

    if (this.constructor.name === 'OptionBlock') {
      throw new TypeError('Abstract class "OptionBlock" cannot be instantiated directly.');
    }

    this._options = data.options;
  }

  get options(): OptionInterface[] {
    return this._options;
  }

  getOptionById(value: string): OptionInterface {
    return this.options.find(option => option.value === value);
  }

  unSelectAllOptions() {
    this.options.forEach((option: OptionInterface) => {
      option.selected = false;
    });
  }
}
