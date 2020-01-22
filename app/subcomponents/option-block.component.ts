import blockBuilder from '../services/block-builder.service';
import { FormBlock } from './form-block.component';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { OptionInterface } from '../interfaces/option.interface';
import { BlockType } from '../enums/block-type.enum';

export class OptionBlock extends FormBlock {
  private _options: OptionInterface[];
  private _hasTwoOptions: boolean;

  constructor(data: OptionBlockInterface) {
    super(data as OptionBlockInterface);

    this._options = data.options;
    this._hasTwoOptions = data.options.length === 2;

    this.updateView();
  }

  get options(): OptionInterface[] {
    return this._options;
  }

  get hasTwoOptions(): boolean {
    return this._hasTwoOptions;
  }

  setState(value: string, isChecked: boolean) {
    let option = this.getOptionById(value as string);

    if (this.type === BlockType.RADIO) {
      this._unSelectAllOptions();
      this._selectRadioOption(option);
    }
    else if (this.type === BlockType.CHECKBOX) {
      this._selectCheckboxOption(option, isChecked);
    }

    this.updateView();
  }

  resetState() {
    this._unSelectAllOptions();

    this.updateView();
  }

  getOptionById(value: string): OptionInterface {
    return this.options.find(option => option.value === value);
  }

  _selectCheckboxOption(option: OptionInterface, isChecked: boolean) {
    option.selected = isChecked;
  }

  _selectRadioOption(option: OptionInterface) {
    option.selected = true;
  }

  _unSelectAllOptions() {
    this.options.forEach((option: OptionInterface) => {
      option.selected = false;
    });
  }

  updateView() {
    this.html = blockBuilder(this as OptionBlock);
  }
}
