import blockBuilder from '../services/block-builder.service';
import { OptionBlock } from './option-block.component';
import { OptionInterface } from '../interfaces/option.interface';
import { DecisionBlockInterface } from '../interfaces/decision-block.interface';

export class DecisionBlock extends OptionBlock {
  private _nextSection: string;
  private _selectedOptionId: string;

  constructor(data: DecisionBlockInterface) {
    super(data as DecisionBlockInterface);

    this._nextSection = '';
    this._selectedOptionId = '';

    this.updateView();
  }

  get nextSection(): string {
    return this._nextSection;
  }

  set nextSection(newNextSection: string) {
    this._nextSection = newNextSection;
  }

  get selectedOptionId(): string {
    return this._selectedOptionId;
  }

  set selectedOptionId(optionId: string) {
    this._selectedOptionId = optionId;
  }

  setState(value: string, isChecked: boolean) {
    super.setState(value, isChecked);

    let option = this.getOptionById(value as string) as OptionInterface;

    this.nextSection = (option.selected) ? option.questionBlockId : '';
    this.selectedOptionId = (option.selected && option.optionId) ? option.optionId : '';

    this.updateView();
  }

  getOptionById(value: string): OptionInterface {
    let option = this.options.find((opt) => {
      const optionId = (opt.optionId) ? `-${opt.optionId}` : ``;
      return value === (opt.questionBlockId + optionId);
    });

    return option;
  }

  resetState() {
    super.resetState();

    this.nextSection = '';

    this.updateView();
  }

  updateView() {
    this.html = blockBuilder(this as DecisionBlock);
  }
}
