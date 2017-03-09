import { Response } from '@angular/http';
import * as moment from 'moment';
import * as _ from 'lodash';

const dateFormatString = 'MMM DD, YYYY';

function extend<T, U>(obj: T, extension: U) {
    Object.keys(obj).forEach((key) => {
        extension[key] = obj[key];
    });

    return extension as T & U;
}

function inArray<T>(list: T[], item: T): boolean {
    for (let x of list) {
        if (x === item) {
            return true;
        }
    }

    return false;
}

function sameDate(date1: moment.Moment, date2: moment.Moment): boolean {
    if (date1 === date2) {
        return true;
    }

    if (_.isNil(date1) || _.isNil(date2)) {
        return false;
    }

    return date1.year() === date2.year() && date1.month() === date2.month() && date1.date() === date2.date();
}

function formatDate(date: moment.Moment): string {
    return date.format(dateFormatString);
}

function parseDate(date: string, formatString: string = dateFormatString): moment.Moment {
    return moment.utc(date, formatString);
}

function saveExcel(response: Response, fileName: string) {
    let contentType = 'application/vnd.ms-excel';
    let blob = response.blob();
    if (navigator.appVersion.toString().indexOf('.NET') > 0) {
        window.navigator.msSaveBlob(blob, fileName);
    } else {
        let e = document.createEvent('MouseEvents');
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        (<any>a.dataset).downloadurl = [contentType, a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
}

export let Helper = {
    inArray: inArray,
    sameDate: sameDate,
    parseDate: parseDate,
    formatDate: formatDate,
    saveExcel: saveExcel,
    extend: extend
};
