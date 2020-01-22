export default function validDate(day: string, month: string, year: string): boolean {
    const dayFormatted = parseInt(day);
    const monthFormatted = parseInt(month);
    const yearFormatted = parseInt(year);
    const currentDate = new Date();

    if (isNaN(dayFormatted) || isNaN(monthFormatted) || isNaN(yearFormatted)) {
        return false;
    } else {
        if (dayFormatted > 31 || dayFormatted < 1) {
            return false;
        } else if ((monthFormatted == 4 || monthFormatted == 6 || monthFormatted == 9 || monthFormatted == 11) && dayFormatted == 31) {
            return false;
        } else if (monthFormatted == 2) {
            const isleap = (yearFormatted % 4 == 0 && (yearFormatted % 100 != 0 || yearFormatted % 400 == 0));
            if (dayFormatted > 29 || (dayFormatted == 29 && !isleap)) {
                return false;
            }
        }
        if (monthFormatted > 12 || monthFormatted < 1) {
            return false;
        }
        if (yearFormatted < 1900 || yearFormatted > currentDate.getFullYear() + 100) {
            return false;
        }
        return true;
    }
}
