import blockBuilder from '../services/block-builder.service';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { OptionInterface } from '../interfaces/option.interface';
import { OptionBlock } from './option-block.component';

export class CheckboxBlock extends OptionBlock {
  private readonly _isSingleOptionWithoutLegend: boolean;

  constructor(data: OptionBlockInterface) {
    super(data as OptionBlockInterface);
    this._isSingleOptionWithoutLegend = data.options.length === 1 && (!data.label || data.label.length === 0);
  }

  get isSingleOptionWithoutLegend(): boolean {
    return this._isSingleOptionWithoutLegend;
  }

  setState(value: string, isChecked: boolean) {
    let option = this.getOptionById(value as string);

    this._selectCheckboxOption(option, isChecked);
  }

  resetState() {
    this.unSelectAllOptions();
  }
  
  _selectCheckboxOption(option: OptionInterface, isChecked: boolean) {
    option.selected = isChecked;
  }
}
