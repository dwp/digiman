import blockBuilder from '../services/block-builder.service';
import * as dateUtils from '../utils/date.utils';
import { FormBlock } from './form-block.component';
import { DateBlockInterface } from '../interfaces/date-block.interface';

export class DateBlock extends FormBlock {
  private _day: string;
  private _month: string;
  private _year: string;
  private _value: number;
  private _DEFAULT_HINT_TEXT = "For example, 31 3 2018";

  constructor(data: DateBlockInterface) {
    super(data as DateBlockInterface);

    this._day = data.day;
    this._month = data.month;
    this._year = data.year;

    this.hint = (this.hint && this.hint.length > 0) ? this.hint : this._DEFAULT_HINT_TEXT;

    this.updateView();
  }

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    this._value = newValue;
  }

  get day(): string {
    return this._day;
  }

  set day(newValue: string) {
    this._day = dateUtils.sanitiseDayOrMonth(newValue);
  }

  get month(): string {
    return this._month;
  }

  set month(newValue: string) {
    this._month = dateUtils.sanitiseDayOrMonth(newValue);
  }

  get year(): string {
    return this._year;
  }

  set year(newValue: string) {
    this._year = dateUtils.sanitiseYear(newValue);
  }

  updateValue() {
    if (this.day && this.month && this.year) {
      this.value = parseInt(this.year + this.month + this.day);
    }
  }

  isValueValid(stringValue: string): boolean {
    return stringValue.length === 8;
  }

  setState(value: number) {
    let stringValue = dateUtils.sanitiseDate(value.toString());
    
    if (this.isValueValid(stringValue)) {
      this.value = value;

      this.day = dateUtils.getDay(stringValue);
      this.month = dateUtils.getMonth(stringValue);
      this.year = dateUtils.getYear(stringValue);

      this.updateView();
    }
  }

  resetState() {
    this.value = null;
    this.day = '';
    this.month = '';
    this.year = '';
    
    this.updateView();
  }

  updateView() {
    this.html = blockBuilder(this as DateBlock);
  }
}