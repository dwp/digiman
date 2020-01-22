import { BaseComponent } from './base.component';
import { DatePickerComponent } from './date-picker.component';
import { validDate } from '../utils/index.utils';
import ComponentProperties from '../interfaces/component-properties.interface';

export class DateFieldsComponent extends BaseComponent {
  private day: HTMLInputElement;
  private month: HTMLInputElement;
  private year: HTMLInputElement;
  private datePickerContainer: HTMLElement;
  private datePicker: DatePickerComponent;
  private currentDate: Date;
  private lastNavigableDay: Date;

  constructor(params: ComponentProperties, element: HTMLElement) {
    super(params, element);
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    if (this.datePickerContainer) {
        this.instantiateDatePicker();
      }
  }

  cacheElements() {
      this.day = this.container.querySelector('.day');
      this.month = this.container.querySelector('.month');
      this.year = this.container.querySelector('.year');
      this.datePickerContainer = this.container.querySelector('.date-picker__text-date');
  }

  bindEvents() {
  }

  instantiateDatePicker() {
    this.datePicker = new DatePickerComponent(
      {
        selector: '.date-picker__text-date',
        config: {
          showYear: true,
          initialDate: this.currentDate,
          endDate: this.lastNavigableDay,
          disableToggle: false,
          disableButton: false,
          disableInput: true,
          selectByWeek: false,
          callback: this.handleDatePickerClick.bind(this),
          onOpen: this.setSelectedDate.bind(this)
        }
      },
      this.datePickerContainer
    );
  }

  handleDatePickerClick(date: string) {
    const selectedDate = new Date(date);
    const day: number = selectedDate.getDate();
    const month: number = selectedDate.getMonth() + 1;
    const year: number = selectedDate.getFullYear();
    this.day.value = day < 10 ? `0${day}` : day.toString();
    this.month.value = month < 10 ? `0${month}` : month.toString();
    this.year.value = year.toString();
  }

  setSelectedDate() {
    if (validDate(this.day.value, this.month.value, this.year.value)) {
      this.datePicker.selectDateExternally(parseInt(this.day.value), parseInt(this.month.value) - 1, parseInt(this.year.value));
    }
  }
}