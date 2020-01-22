function getDay(value: string) {
  return value.substring(6, 8);
}

function getMonth(value: string) {
  return value.substring(4, 6);
}

function getYear(value: string) {
  return value.substring(0, 4);
}

function sanitiseDayOrMonth(value: string): string {
  let dayOrMonth = sanitiseDate(value);

  if (dayOrMonth.length === 1) {
    dayOrMonth = '0' + dayOrMonth;
  }
  
  if (dayOrMonth.length !== 2) {
    dayOrMonth = null;
  }

  return dayOrMonth;
}

function sanitiseYear(value: string): string {
  let year = sanitiseDate(value);
  return (year.length === 4) ? year : null;
}

function sanitiseDate(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export {
  getDay,
  getMonth,
  getYear,
  sanitiseDayOrMonth,
  sanitiseYear,
  sanitiseDate
}