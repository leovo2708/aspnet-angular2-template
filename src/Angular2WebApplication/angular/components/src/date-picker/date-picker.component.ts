import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange,
    ViewChild, ElementRef, HostListener
} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Helper } from '../helper';

class DayHeader {
    text: string;
    description: string;
    isWeekend: boolean;
}

class Date {
    text: string;
    value: moment.Moment;
    active: boolean;
    past: boolean;
    future: boolean;
    disabled: boolean;
}

class Week {
    dates: Date[];
};

let weeksOfMonth = 6;
let daysOfWeek = 7;
let monthsOfYear = 12;

@Component({
    selector: 'nap-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: [
        './date-picker.component.scss'
    ]
})
export class DatePickerComponent implements OnInit, OnChanges {
    @ViewChild('dropdownInput') dropdownInput: ElementRef;
    @Input() minDate: moment.Moment;
    @Input() maxDate: moment.Moment;
    @Input() date: moment.Moment;
    @Output() dateChange = new EventEmitter<moment.Moment>();
    isOpen: boolean = false;
    previousDisabled: boolean = false;
    nextDisabled: boolean = false;
    months: number[];
    month: number;
    years: number[];
    year: number;
    dayHeaders: DayHeader[];
    weeks: Week[];
    private activeDate: moment.Moment;
    @HostListener('keyup.esc') keyUpEsc() {
        this.isOpen = false;
    }
    @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {
        if (event.target !== this.dropdownInput.nativeElement) {
            this.isOpen = false;
        }
    }

    constructor() {
        if (_.isNil(this.minDate)) {
            this.minDate = moment.utc([1970, 0, 1]);
        }
        if (_.isNil(this.maxDate)) {
            this.maxDate = moment.utc();
        }
    }

    ngOnInit() {
        this.dayHeaders = this.generateDayHeaders();

        let date = this.date;
        if (_.isNil(date)) {
            date = moment.utc();
        }
        this.setDate(date);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        let change = changes['minDate'] || changes['maxDate'];
        if (!_.isNil(change) && !_.isNil(change.currentValue)) {
            this.setDate(this.date);
            return;
        }

        change = changes['date'];
        if (!_.isNil(change) && !_.isNil(change.currentValue)) {
            this.setDate(change.currentValue);
            return;
        }
    }

    toggleOpen() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.setActiveDate(this.date, true);
        }
    }

    goPreviousMonth() {
        if (this.previousDisabled) {
            return;
        }

        let newActiveDate = moment.utc(this.activeDate).add(-1, 'month');
        this.setActiveDate(newActiveDate, false);
    }

    goNextMonth() {
        if (this.nextDisabled) {
            return;
        }

        let newActiveDate = moment.utc(this.activeDate).add(1, 'month');
        this.setActiveDate(newActiveDate, false);
    }

    onChangeMonth(month: number) {
        let newActiveDate = moment.utc(this.activeDate).month(month);
        this.setActiveDate(newActiveDate, false);
    }

    onChangeYear(year: number) {
        let newActiveDate = moment.utc(this.activeDate).year(year);
        this.setActiveDate(newActiveDate, false);
    }

    onChangeDate(date: Date) {
        if (date.disabled) {
            return;
        }

        this.setDate(date.value);
        this.dateChange.emit(this.date);
        this.isOpen = false;
    }

    getMonthName(month: number) {
        const monthShortNames = moment.monthsShort();
        return monthShortNames[month];
    }

    private setDate(date: moment.Moment) {
        if (this.minDate.isAfter(this.maxDate)) {
            throw new Error('minDate must be less than maxDate');
        }

        if (date.isBefore(this.minDate)) {
            date = moment.utc(this.minDate);
        } else if (date.isAfter(this.maxDate)) {
            date = moment.utc(this.maxDate);
        }
        this.date = date;
        let activeDate = moment.utc(this.date);
        this.setActiveDate(activeDate, true);
    }

    private setActiveDate(activeDate: moment.Moment, isProgramming: boolean) {
        if (_.isNil(activeDate)) {
            return;
        }

        if (!isProgramming && Helper.sameDate(activeDate, this.activeDate)) {
            return;
        }

        if (activeDate.isBefore(this.minDate)) {
            activeDate = moment.utc(this.minDate);
        } else if (activeDate.isAfter(this.maxDate)) {
            activeDate = moment.utc(this.maxDate);
        }
        this.activeDate = activeDate;
        this.years = this.generateYears();
        this.months = this.generateMonths();
        this.weeks = this.generateWeeks();
        this.year = this.activeDate.year();
        this.month = this.months.filter(month => month === this.activeDate.month())[0];
        this.previousDisabled = this.weeks[0].dates[0].disabled;
        this.nextDisabled = this.weeks[weeksOfMonth - 1].dates[daysOfWeek - 1].disabled;
    }

    private generateMonths(): number[] {
        let months: number[] = [];
        let date = moment(this.activeDate);
        let startOfMonthOfMinDate = moment.utc(this.minDate).startOf('month');
        let endOfMonthOfMaxDate = moment.utc(this.maxDate).endOf('month');
        for (let month = 0; month < monthsOfYear; month++) {
            date.month(month);
            if (date.isBefore(startOfMonthOfMinDate) || date.isAfter(endOfMonthOfMaxDate)) {
                continue;
            }

            months.push(month);
        }

        return months;
    }

    private generateYears(): number[] {
        let years: number[] = [];
        let beginYear = this.minDate.year();
        let endYear = this.maxDate.year();
        for (let year = beginYear; year <= endYear; year++) {
            years.push(year);
        }

        return years;
    }

    private generateDayHeaders(): DayHeader[] {
        let dayShortNames = moment.weekdaysMin();
        let dayFullNames = moment.weekdays();
        let dayHeaders: DayHeader[] = [];
        for (let day = 0; day < daysOfWeek; day++) {
            let shortName = dayShortNames[day];
            let fullName = dayFullNames[day];
            let isWeekend = day === 0 || day === 6;
            let dayHeader: DayHeader = {
                text: shortName,
                description: fullName,
                isWeekend: isWeekend
            };
            dayHeaders.push(dayHeader);
        }

        return dayHeaders;
    }

    private generateWeeks(): Week[] {
        let weeks: Week[] = [];
        let startOfMonthOfActiveDate = moment.utc(this.activeDate).startOf('month');
        let startDate = moment.utc(startOfMonthOfActiveDate).subtract(Math.abs(startOfMonthOfActiveDate.weekday()), 'days');
        let endOfMonthOfActiveDate = moment.utc(this.activeDate).endOf('month');
        for (let i = 0; i < weeksOfMonth; i++) {
            let dates: Date[] = [];
            for (let j = 0; j < daysOfWeek; j++) {
                let momentDate = moment.utc(startDate).add((i * 7) + j, 'days');
                let date: Date = {
                    text: momentDate.format('D'),
                    value: momentDate,
                    active: Helper.sameDate(momentDate, this.activeDate),
                    past: momentDate.isBefore(startOfMonthOfActiveDate),
                    future: momentDate.isAfter(endOfMonthOfActiveDate),
                    disabled: momentDate.isBefore(this.minDate) || momentDate.isAfter(this.maxDate)
                };
                dates.push(date);
            }
            let week: Week = {
                dates: dates
            };
            weeks.push(week);
        }

        return weeks;
    }
}
