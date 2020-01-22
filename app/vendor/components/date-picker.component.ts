import { BaseComponent } from './base.component';
import { delegateEvent, createElement, parseTemplate, returnAncestorWithClass } from '../utils/index.utils';
import { DAYS_OF_WEEK, MONTHS } from '../constants/dates.const';
import { NavigationDirection } from '../enums/navigation-direction.enum';
import { DateOffset } from '../enums/date-offset.enum';
import ComponentProperties from '../interfaces/component-properties.interface';

export class DatePickerComponent extends BaseComponent {

  private currentMonth: number;
  private currentYear: number;
  private cachedDate: Date;
  private isOpen: boolean = false;
  private buttonText: string = this.config.buttonText || null;
  private startDate: Date = this.config.startDate ? new Date(this.config.startDate.setHours(0,0,0,0)) : null;
  private selectedDate: Date = this.config.initialDate ? new Date(this.config.initialDate.setHours(0,0,0,0)) : null;
  private endDate: Date = this.config.endDate ? new Date(this.config.endDate.setHours(0,0,0,0)) : null;
  private showYear: boolean = this.config.showYear || false;
  private showToday: boolean = this.config.showToday || true;
  private disableToggle: boolean = this.config.disableToggle || false;
  private disableButton: boolean = this.config.disableButton || false;
  private disableInput: boolean = this.config.disableInput || false;
  private selectByWeek: boolean = this.config.selectByWeek || false;
  private disablePastDates: boolean = this.config.disablePastDates || false;
  private focusableElements: HTMLElement[];
  private today: number = new Date().setHours(0,0,0,0);
  private days: string[] = DAYS_OF_WEEK.slice();
  private months: string[] = MONTHS;
  private classes: { inactiveDate: string; selectableDate: string; dateHighlighted: string; dateSelected: string; hidden: string; container: string; button: string; row: string; controls: string; nonToggle: string; highlightWeek: string; today: string; };
  private input: HTMLInputElement;
  private button: HTMLInputElement;
  private controls: HTMLElement;
  private datePickerContainer: HTMLDivElement;
  private leftCaretTpl: string;
  private rightCaretTpl: string;
  private yearSectionTpl: string;
  private monthSectionTpl: string;
  private calendarTableTpl: string;
  private tableRowTpl: string;
  private tableInactiveCellTpl: string;
  private tableActiveCellTpl: string;

  constructor(params: ComponentProperties, element: HTMLElement) {
    super(params, element);
    this.days.push(this.days.shift());

    this.classes = {
      inactiveDate: 'date-picker__inactive-date',
      selectableDate: 'date-picker__selectable-date',
      dateHighlighted: 'date-picker__date-highlighted',
      dateSelected: 'date-picker__date-selected',
      hidden: 'hidden',
      container: 'date-picker__container',
      button: 'date-picker__button--toggle',
      row: 'date-picker__table-row',
      controls: 'date-picker__controls',
      nonToggle: 'date-picker__non-toggle',
      highlightWeek: 'date-picker__highlight-week',
      today: 'date-picker__today'
    };

    this.init();
  }

  init() {
    this.cacheElements();
    this.cacheTemplates();
    this.initialiseElements();
    this.bindEvents();
  }

  cacheElements() {
    this.input = this.container.querySelector('input');
    this.button = this.container.querySelector(`.${this.classes.button}`);
    this.controls = this.container.querySelector(`.${this.classes.controls}`);
    this.datePickerContainer = document.createElement('div');
  }

  cacheTemplates() {
    this.leftCaretTpl = `
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false" width="11" height="28" viewBox="0 0 11 28" class="date-picker__button-caret">
        <title>Previous</title>
        <path d="M10 7v14c0 0.547-0.453 1-1 1-0.266 0-0.516-0.109-0.703-0.297l-7-7c-0.187-0.187-0.297-0.438-0.297-0.703s0.109-0.516 0.297-0.703l7-7c0.187-0.187 0.438-0.297 0.703-0.297 0.547 0 1 0.453 1 1z"></path>
      </svg>`;

    this.rightCaretTpl = `
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false" width="11" height="28" viewBox="0 0 11 28" class="date-picker__button-caret">
        <title>Next</title>
        <path d="M9 14c0 0.266-0.109 0.516-0.297 0.703l-7 7c-0.187 0.187-0.438 0.297-0.703 0.297-0.547 0-1-0.453-1-1v-14c0-0.547 0.453-1 1-1 0.266 0 0.516 0.109 0.703 0.297l7 7c0.187 0.187 0.297 0.438 0.297 0.703z"></path>
      </svg>`;

    this.yearSectionTpl = `
      <div class="date-picker__container--title">
        <button type="button" class="previous year date-picker__button--arrow" title="Previous Year" aria-label="Previous Year">
          ${this.leftCaretTpl}
        </button>
        <div title="Press Escape to cancel" class="date-picker__title" role="presentation">
          <span><strong>{currentYear}</strong></span>
        </div>
        <button type="button" class="next year date-picker__button--arrow"  title="Next Year" aria-label="Next Year">
          ${this.rightCaretTpl}
        </button>
      </div>`;

    this.monthSectionTpl = `
      <div class="date-picker__container--title">
        <button type="button" class="previous month date-picker__button--arrow {previousButtonClasses}"  title="Previous Month" aria-label="Previous Month"
        {previousButtonAttributes}>
          ${this.leftCaretTpl}
        </button>
        <div class="month date-picker__title" role="presentation">
          <span><strong>{monthLabel}</strong></span>
        </div>
        <button type="button" class="next month date-picker__button--arrow {nextButtonClasses}"  title="Next Month" aria-label="Next Month"
          {nextButtonAttributes}>
          ${this.rightCaretTpl}
        </button>
      </div>`;

    this.calendarTableTpl = `
      <table role="application" class="date-picker__table" aria-label="Calendar" summary="Calendar Date Picker">
        <tr>
          <th scope="col" class="date-picker__cell" title="Monday" role="presentation">
            <span>M</span>
          </th>
          <th scope="col" class="date-picker__cell" title="Tuesday" role="presentation">
            <span>T</span>
          </th>
          <th scope="col" class="date-picker__cell" title="Wednesday" role="presentation">
            <span>W</span>
          </th>
          <th scope="col" class="date-picker__cell" title="Thursday" role="presentation">
            <span>T</span>
          </th>
          <th scope="col" class="date-picker__cell" title="Friday" role="presentation">
            <span>F</span>
          </th>
          <th scope="col" class="date-picker__cell" title="Saturday" role="presentation">
            <span>S</span>
          </th>
          <th scope="col" class="date-picker__cell" title="Sunday" role="presentation">
            <span>S</span>
          </th>
        </tr>
      </table>`;

    this.tableRowTpl = `
      <tr class="${this.classes.row} {classes}"></tr>`;

    this.tableInactiveCellTpl = `
      <td class="date-picker__cell ${this.classes.inactiveDate}">
        <span tabindex="-1" aria-hidden="true">{content}</span>
      </td>`;

    this.tableActiveCellTpl = `
      <td data-day="{day}" class="date-picker__cell ${this.classes.selectableDate} {classes} {today}">
        <button tabindex="{tabindex}" type="button" class="date-picker__link" aria-label="{ariaLabel}">{content}</button>
      </td>`;
  }

  initialiseElements() {
    this.datePickerContainer.classList.add(this.classes.container);
    this.datePickerContainer.classList.toggle(this.classes.hidden, !this.disableToggle);
    this.datePickerContainer.setAttribute('role', 'dialog');
    this.container.appendChild(this.datePickerContainer);

    if (this.disableToggle) {
      let dateValue = this.getDateValue();

      this.isOpen = true;
      this.datePickerContainer.classList.add(this.classes.nonToggle);
      this.createDatePicker(dateValue);
      this.setHighlightedElement();

    } else {
      this.controls.classList.remove(this.classes.hidden);
    }

    if (this.disableButton) {
      this.button.classList.add(this.classes.hidden);
    } else {
      if (this.buttonText) {
        this.button.innerHTML = this.buttonText;
      }
    }

    if (this.disableInput) {
      this.input.classList.add(this.classes.hidden);
    }
  }

  bindEvents() {
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    this.controls.addEventListener('click', this.handleControlsClick.bind(this));
    delegateEvent(this.datePickerContainer, 'click', '.year', this.handleYearClick.bind(this));
    delegateEvent(this.datePickerContainer, 'click', '.month', this.handleMonthClick.bind(this));
    delegateEvent(this.datePickerContainer, 'click', `.${this.classes.selectableDate}`, this.handleDayClick.bind(this));

    this.datePickerContainer.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  handleYearClick(e : DelegateEvent) {
    const target = e.subjectTarget;

    e.stopPropagation();

    if (target.classList.contains('next')) {
      this.changeYear(NavigationDirection.Next);
    }
    else if (target.classList.contains('previous')) {
      this.changeYear(NavigationDirection.Previous);
    }
  }

  handleMonthClick(e : DelegateEvent) {
    const target = e.subjectTarget;

    e.stopPropagation();

    if (target.classList.contains('next') && !target.disabled) {
      this.changeMonth(NavigationDirection.Next);
    }
    else if (target.classList.contains('previous') && !target.disabled) {
      this.changeMonth(NavigationDirection.Previous);
    }
  }

  handleDayClick(e : DelegateEvent) {
    this.selectDate(e.subjectTarget);
  }

  handleControlsClick(e : DelegateEvent) {
    e.preventDefault();

    this.toggleDatePicker();
  }

  handleDocumentClick(e : DelegateEvent) {
    const target = e.target as HTMLElement;

    if (!this.container.contains(target)) {
      this.toggleDatePicker(false);
    }
  }

  handleKeyPress(e : KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.keyCode === 37) {
      e.preventDefault();
      this.moveFocus(DateOffset.PreviousDay);
    } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
      e.preventDefault();
      this.moveFocus(DateOffset.NextDay);
    } else if (e.key === 'ArrowUp' || e.keyCode === 38) {
      e.preventDefault();
      this.moveFocus(DateOffset.PreviousWeek);
    } else if (e.key === 'ArrowDown' || e.keyCode === 40) {
      e.preventDefault();
      this.moveFocus(DateOffset.NextWeek);
    } else if (e.key === 'Enter' || e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      this.handleEnter(e.target as HTMLElement);
    } else if (e.key === 'Tab' || e.keyCode === 9) {
      this.focusableElements = this.getAllFocusableElements(this.datePickerContainer);
      this.handleTab(e);
    } else if (e.key === 'Escape' || e.keyCode === 27) {
      this.toggleDatePicker(false);
    }
  }

  createDatePicker(date : Date) {
    this.cachedDate = this.cloneDate(date);
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();

    const lastDay = new Date(new Date(this.currentYear, this.currentMonth + 1, 0).setHours(0,0,0,0));
    let outOfRangeFuture = (this.endDate && this.endDate <= lastDay);
    let outOfRangePast = (this.startDate && this.disablePastDates && this.startDate.getMonth() === this.currentMonth && this.startDate.getFullYear() === this.currentYear);
    let calendarTable = createElement(this.calendarTableTpl);
    let monthHtmlSection = parseTemplate(this.monthSectionTpl, {
      monthLabel: `${this.months[this.currentMonth]} ${this.showYear ? '' : this.currentYear}`,
      nextButtonClasses: outOfRangeFuture ? 'date-picker__button--disabled' : '',
      nextButtonAttributes: outOfRangeFuture ? 'disabled="disabled"' : '',
      previousButtonClasses: outOfRangePast ? 'date-picker__button--disabled' : '',
      previousButtonAttributes: outOfRangePast ? 'disabled="disabled" tabIndex="-1"' : '',
    });

    this.clearCalendar();

    if (this.showYear) {
      let yearHtmlSection = parseTemplate(this.yearSectionTpl, {
        currentYear: this.currentYear
      });

      this.datePickerContainer.appendChild(yearHtmlSection);
    }

    this.populateCalendar(calendarTable);

    this.datePickerContainer.appendChild(monthHtmlSection);
    this.datePickerContainer.appendChild(calendarTable);
    this.focusableElements = this.getAllFocusableElements(this.datePickerContainer);
  }

  populateCalendar(calendarTable : HTMLElement) {
    const startDate = new Date(this.currentYear, this.currentMonth, 1);
    const MONTH_LENGTH = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const PREV_MONTH_LENGTH = new Date(this.currentYear, this.currentMonth, 0).getDate();
    const START_DAY_OF_WEEK = startDate.getDay() === 0 ? 6 : startDate.getDay() - 1;
    const IS_FOUR_ROW_MONTH = (MONTH_LENGTH === 28 && START_DAY_OF_WEEK === 0);

    let dayCount = 1;
    let nextMonthCount = 1;

    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      let row = parseTemplate(this.tableRowTpl, {
        classes: this.selectByWeek ? this.classes.highlightWeek : ''
      });

      for (let cellIndex = 0; cellIndex < 7; cellIndex++) {
        let cell;
        let day = new Date(this.currentYear, this.currentMonth, dayCount);
        let isSelectedDate = this.selectedDate.getTime() === new Date(this.currentYear, this.currentMonth, dayCount).getTime();
        let isToday = this.today === day.getTime();

        if (rowIndex === 0 && IS_FOUR_ROW_MONTH) {
          cell = parseTemplate(this.tableInactiveCellTpl, {
            content: PREV_MONTH_LENGTH - START_DAY_OF_WEEK + cellIndex - 6
          });
        }
        else if (rowIndex === 0 && cellIndex < START_DAY_OF_WEEK) {
          cell = parseTemplate(this.tableInactiveCellTpl, {
            content: PREV_MONTH_LENGTH - START_DAY_OF_WEEK + cellIndex + 1
          });
        }
        else if (dayCount <= MONTH_LENGTH && (this.endDate || this.startDate)) {
          if (this.startDate && this.endDate) {
            if (this.startDate && day >= this.startDate && this.endDate && day <= this.endDate) {
              cell = this.createActiveCell(dayCount, isSelectedDate, isToday, cellIndex, this.days, this.months, this.currentMonth, this.currentYear);
            } else {
              cell = this.createInactiveCell(dayCount);
            }
          } else if (this.startDate && !this.endDate) {
            if (this.startDate && day >= this.startDate) {
              cell = this.createActiveCell(dayCount, isSelectedDate, isToday, cellIndex, this.days, this.months, this.currentMonth, this.currentYear);
            } else {
              cell = this.createInactiveCell(dayCount);
            }
          } else if (this.endDate && !this.startDate) {
            if (this.endDate && day <= this.endDate) {
              cell = this.createActiveCell(dayCount, isSelectedDate, isToday, cellIndex, this.days, this.months, this.currentMonth, this.currentYear);
            } else {
              cell = this.createInactiveCell(dayCount);
            }
          }
          dayCount++;
        }
        else if (dayCount <= MONTH_LENGTH && !this.endDate && !this.startDate) {
          cell = this.createActiveCell(dayCount, isSelectedDate, isToday, cellIndex, this.days, this.months, this.currentMonth, this.currentYear);
          dayCount++;
        }
        else {
          cell = parseTemplate(this.tableInactiveCellTpl, {
            content: nextMonthCount
          });

          nextMonthCount++;
        }

        row.appendChild(cell);
      }

      calendarTable.appendChild(row);
    }
  }

  createInactiveCell(dayCount : number) {
    return parseTemplate(this.tableInactiveCellTpl, {
      content: dayCount
    });
  }

  createActiveCell(dayCount : number, isSelectedDate : boolean, isToday : boolean, cellIndex : number, days : string[], months : string[], currentMonth : number, currentYear : number) {
    return parseTemplate(this.tableActiveCellTpl, {
      day: dayCount,
      classes: isSelectedDate ? this.classes.dateSelected : '',
      tabindex: isSelectedDate ? 0 : -1,
      ariaLabel: `${dayCount}, ${days[cellIndex]} ${months[currentMonth]} ${currentYear}`,
      content: `${dayCount}${isSelectedDate ? '<span class="hidden">Selected Date</span>' : ''}`,
      today: this.showToday ? (isToday ? this.classes.today : '' ) : ''
    });
  }

  selectDate(target : HTMLElement) {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, parseInt(target.dataset.day));

    if (target.classList.contains(this.classes.selectableDate)) {

      if (this.container.querySelector(`.${this.classes.dateSelected}`)) {
        const element = this.container.querySelector(`.${this.classes.dateSelected}`) as HTMLElement;
        element.classList.remove(this.classes.dateSelected);
        const child = element.children[0] as HTMLElement;
        child.tabIndex = -1;
      }

      if (this.container.querySelector(`.${this.classes.dateHighlighted}`)) {
        const element = this.container.querySelector(`.${this.classes.dateHighlighted}`);
        element.classList.remove(this.classes.dateHighlighted);
        const child = element.children[0] as HTMLElement;
        child.tabIndex = -1;
      }

      if (!this.disableButton) {
        this.toggleDatePicker();
      } else {
        const anchor = target.tagName.toLowerCase() === 'a' ? target : target.children[0];
        this.setFocus(anchor as HTMLInputElement);
      }

      target.classList.add(this.classes.dateSelected, this.classes.dateHighlighted);
      target.tabIndex = 0;
      this.cachedDate = this.selectedDate;
      this.input.value = this.selectedDate.toString();
      this.config.callback(this.selectedDate);
    }
  }

  deselectDate(element : HTMLElement) {
    if (element && element.children.length > 0) {
      const child = element.children[0] as HTMLElement;
      child.tabIndex = -1;
      element.classList.remove(this.classes.dateHighlighted);
    }
  }

  toggleDatePicker(toggle? : boolean) {
    if (!this.disableToggle) {
      if (this.isOpen && (toggle === undefined || toggle === false)) {
        if (this.config.onClose) {
          this.config.onClose();
        }
        this.datePickerContainer.classList.add(this.classes.hidden);
        this.setFocus(this.button);
        this.isOpen = false;
      }
      else if (!this.isOpen && (toggle === undefined || toggle === true)) {
        if (this.config.onOpen) {
          this.config.onOpen();
        }
        let dateValue = this.getDateValue();
        this.createDatePicker(dateValue);
        this.datePickerContainer.classList.remove(this.classes.hidden);
        this.setHighlightedElement();

        if (this.container.querySelector(`.${this.classes.dateHighlighted}`)) {
          this.setFocus(this.container.querySelector(`.${this.classes.dateHighlighted}`).children[0] as HTMLInputElement);
        }

        this.isOpen = true;
      }
    }
  }

  changeMonth(direction : NavigationDirection) {
    let newDate;

    if (direction === NavigationDirection.Next ) {
      newDate = new Date(this.cachedDate.getFullYear(), this.cachedDate.getMonth() + 1, 1);
    } else {
      const newMonth = this.cachedDate.getMonth() - 1;
      const year = this.cachedDate.getFullYear();
      if (this.startDate && year === this.startDate.getFullYear() && newMonth === this.startDate.getMonth()) {
        newDate = this.startDate;
      } else {
        newDate = new Date(year, newMonth, 1);
      }
    }

    this.createDatePicker(newDate);

    const classes = direction === NavigationDirection.Next ? 'next month' : 'previous month';
    this.setFocus(this.container.getElementsByClassName(classes)[0] as HTMLInputElement);
    this.setHighlightedElement();
  }

  changeYear(direction : NavigationDirection) {
    let newDate;

    if (direction === NavigationDirection.Next) {
      newDate = new Date(this.cachedDate.getFullYear() + 1, this.cachedDate.getMonth(), 1);
    } else {
      newDate = new Date(this.cachedDate.getFullYear() - 1, this.cachedDate.getMonth(), 1);
    }

    this.createDatePicker(newDate);

    const classes = direction === NavigationDirection.Next ? 'next year' : 'previous year';
    this.setFocus(this.container.getElementsByClassName(classes)[0] as HTMLInputElement);
    this.setHighlightedElement();
  }

  getDateValue() {
    let dateValue;

    if (this.input.value.length) {
      let tempDate = new Date(this.input.value);

      if (!isNaN(tempDate.getTime())) {
        return tempDate;
      }

      this.input.value = '';
    }
    else if (this.selectedDate) {
      return this.cloneDate(this.selectedDate);
    }

    dateValue = new Date();
    dateValue.setHours(0, 0, 0, 0);
    this.selectedDate = dateValue;

    return dateValue;
  }

  setHighlightedElement() {
    if (!this.container.querySelector(`.${this.classes.dateHighlighted}`)) {
      let selectedElement = this.container.querySelector('.' + this.classes.dateSelected);
      if (selectedElement) {
        selectedElement.classList.add(this.classes.dateHighlighted);
      } else {
        let elementToHighlight = this.container.querySelector('.' + this.classes.selectableDate);
        elementToHighlight.classList.add(this.classes.dateHighlighted);
        const child = elementToHighlight.children[0] as HTMLElement;
        child.tabIndex = -1;
      }
    }
  }

  moveFocus(offset : DateOffset) {
    const currentElement = this.container.querySelector(`.${this.classes.dateHighlighted}`) as HTMLElement;
    const CURRENT_MONTH = this.cachedDate.getMonth();
    const CURRENT_YEAR = this.cachedDate.getFullYear();
    let nextElement;
    let anchor;
    let tempDate = this.cloneDate(this.cachedDate);

    tempDate.setDate(tempDate.getDate() + offset);

    nextElement = this.datePickerContainer.querySelector(`[data-day="${tempDate.getDate()}"]`);

    if (CURRENT_MONTH !== tempDate.getMonth() || CURRENT_YEAR !== tempDate.getFullYear()) {

      if ((this.endDate && tempDate <= this.endDate || !this.endDate) && (this.startDate && tempDate >= this.startDate || !this.startDate)) {
        this.createDatePicker(tempDate);
        nextElement = this.datePickerContainer.querySelector(`[data-day="${tempDate.getDate()}"]`);
      } else {
        nextElement = null;
      }
    }

    if (nextElement && nextElement.classList.contains(this.classes.selectableDate)) {

      this.cachedDate = tempDate;
      this.deselectDate(currentElement);

      nextElement.classList.add(this.classes.dateHighlighted);

      if (nextElement.children.length > 0) {
        anchor = nextElement.children[0] as HTMLInputElement;
        anchor.tabIndex = 0;
        this.setFocus(anchor);
      }
    }
  }

  handleEnter(target : HTMLElement) {
    if (returnAncestorWithClass(target, 'month')) {
      const direction = returnAncestorWithClass(target, 'next') ? NavigationDirection.Next : NavigationDirection.Previous;
      this.changeMonth(direction);
    } else if (returnAncestorWithClass(target, 'year')) {
      const direction = returnAncestorWithClass(target, 'next') ? NavigationDirection.Next : NavigationDirection.Previous;
      this.changeYear(direction);
    } else if (returnAncestorWithClass(target, this.classes.selectableDate)) {
      this.selectDate(target.parentElement);
    } else {
      this.toggleDatePicker();
    }
  }

  handleTab(e : KeyboardEvent) {
    const target = e.target as HTMLElement;
    const shift = e.shiftKey;

    if (!this.disableToggle) {
      if (shift) {
        if (this.focusableElements.indexOf(target) === 0) {
          e.preventDefault();
          this.focusLastDescendant();
        }
      } else {
        if (this.focusableElements.indexOf(target) === this.focusableElements.length - 1) {
          e.preventDefault();
          this.focusFirstDescendant();
        } else if (this.focusableElements.length === 1) {
          e.preventDefault();
          this.focusFirstDescendant();
        }
      }
    }
  }

  setFocus(element : HTMLInputElement) {
    if (element && !element.disabled) {
      element.focus();
    } else {
      this.focusFirstDescendant();
    }
  }

  weeksInMonth(firstDay : number, lastDate : number) {
    return Math.ceil((firstDay + lastDate) / 7);
  }

  cloneDate(date : Date) {
    return new Date(date.getTime());
  }

  clearCalendar() {
    this.datePickerContainer.innerHTML = '';
  }

  getAllFocusableElements(element : Element) {
    return Array.from(element.querySelectorAll('button:not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])')) as HTMLElement[];
  }

  focusFirstDescendant() {
    this.focusableElements[0].focus();
  }

  focusLastDescendant() {
    const lastIndex = this.focusableElements.length - 1;
    this.focusableElements[lastIndex].focus();
  }

  selectDateExternally(day : number, month : number, year : number) {
    const date = new Date(year, month, day);
    this.input.value = date.toString();
    this.selectedDate = date;
  }

  unsetDate() {
    this.input.value = '';
    this.selectedDate = null;
  }
}
