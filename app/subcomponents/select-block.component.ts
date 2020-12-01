import blockBuilder from '../services/block-builder.service';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { OptionInterface } from '../interfaces/option.interface';
import { OptionBlock } from './option-block.component';

export class SelectBlock extends OptionBlock {
  private _value: string = '';
  private _noOptionSelected: boolean = true;

  constructor(data: OptionBlockInterface) {
    super(data as OptionBlockInterface);

    this.updateView();
  }

  set value(newValue: string) {
    this._value = newValue;
  }

  get value(): string {
    return this._value;
  }

  set noOptionSelected(newValue: boolean) {
    this._noOptionSelected = newValue;
  }

  get noOptionSelected(): boolean {
    return this._noOptionSelected;
  }

  setState(value: string) {
    let option = this.getOptionById(value as string);

    this._unSelectAllOptions();
    this._selectOption(option);

    this.updateView();
  }

  resetState() {
    this._unSelectAllOptions();
    this.updateView();
  }

  _selectOption(option: OptionInterface) {
    option.selected = true;
    this.value = option.value;
    this.noOptionSelected = false;
  }

  _unSelectAllOptions() {
    this.noOptionSelected = true;
    this.value = '';
    this.options.forEach((option: OptionInterface) => {
      option.selected = false;
    });
  }

  updateView() {
    this.htmlNode = blockBuilder(this as SelectBlock);
  }
}
