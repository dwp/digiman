import blockBuilder from '../services/block-builder.service';
import { OptionBlockInterface } from '../interfaces/option-block.interface';
import { OptionInterface } from '../interfaces/option.interface';
import { OptionBlock } from './option-block.component';

export class RadioBlock extends OptionBlock {
  private _hasTwoOptions: boolean;

  constructor(data: OptionBlockInterface) {
    super(data as OptionBlockInterface);

    this._hasTwoOptions = data.options.length === 2;

    this.updateView();
  }

  get hasTwoOptions(): boolean {
    return this._hasTwoOptions;
  }

  setState(value: string) {
    let option = this.getOptionById(value as string);

    this.unSelectAllOptions();
    this._selectRadioOption(option);

    this.updateView();
  }

  resetState() {
    this.unSelectAllOptions();

    this.updateView();
  }

  _selectRadioOption(option: OptionInterface) {
    option.selected = true;
  }

  updateView() {
    this.htmlNode = blockBuilder(this as RadioBlock);
  }
}
