import blockBuilder from '../services/block-builder.service';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { OptionInterface } from '../interfaces/option.interface';
import { OptionBlock } from './option-block.component';

export class CheckboxBlock extends OptionBlock {
  constructor(data: OptionBlockInterface) {
    super(data as OptionBlockInterface);

    this.updateView();
  }

  setState(value: string, isChecked: boolean) {
    let option = this.getOptionById(value as string);

    this._selectCheckboxOption(option, isChecked);

    this.updateView();
  }

  resetState() {
    this.unSelectAllOptions();

    this.updateView();
  }
  
  _selectCheckboxOption(option: OptionInterface, isChecked: boolean) {
    option.selected = isChecked;
  }

  updateView() {
    this.htmlNode = blockBuilder(this as CheckboxBlock);
  }
}
