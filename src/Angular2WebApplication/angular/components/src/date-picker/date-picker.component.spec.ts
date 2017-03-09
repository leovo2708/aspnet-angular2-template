import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { DatePickerComponent } from './date-picker.component';
import { MomentFormatPipe } from '../moment-format.pipe';

@Component({
    selector: 'nap-test',
    template: '<nap-date-picker [(date)]="date" [minDate]="minDate" [maxDate]="maxDate"></nap-date-picker>',
})
class TestComponent {
    minDate = moment.utc('2015-09-14');
    maxDate = moment.utc('2017-09-14');
    date = moment.utc('2016-09-14');
}

function getOptionValues(element: HTMLSelectElement): string[] {
    return Array.from(element.options).map(x => (x as HTMLOptionElement).value);
}

describe('DatePickerComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    let datePickerComponent: DatePickerComponent;
    let datePickerElement: DebugElement;
    let inputElement: DebugElement;
    let dropdownElement: DebugElement;
    let buttonElement: DebugElement;

    function getNavigatorButtons(): DebugElement[] {
        const previousButton = fixture.debugElement.query(By.css('.calendar-previous > button'));
        const nextButton = fixture.debugElement.query(By.css('.calendar-next > button'));
        return [previousButton, nextButton];
    }

    function showCalendar() {
        buttonElement.triggerEventHandler('click', null);
        fixture.detectChanges();
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                BrowserModule
            ],
            declarations: [
                DatePickerComponent,
                MomentFormatPipe,
                TestComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        datePickerComponent = fixture.debugElement.query(By.css('nap-date-picker')).injector.get(DatePickerComponent);
        datePickerElement = fixture.debugElement.query(By.directive(DatePickerComponent));
        inputElement = fixture.debugElement.query(By.css('.date-picker-input'));
        dropdownElement = fixture.debugElement.query(By.css('.dropdown'));
        buttonElement = fixture.debugElement.query(By.css('.date-picker-input'));
    });

    it('should hide calendar by default', () => {
        expect(dropdownElement.nativeElement).not.toHaveCssClass('open');
    });

    it('should show calendar when click on button', () => {
        buttonElement.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(dropdownElement.nativeElement).toHaveCssClass('open');
    });

    it('should hide calendar when click on button after calendar is openning', () => {
        showCalendar();
        buttonElement.triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(dropdownElement.nativeElement).not.toHaveCssClass('open');
    });

    it('should hide calendar when press Esc', () => {
        showCalendar();
        datePickerElement.triggerEventHandler('keyup.esc', null);
        fixture.detectChanges();
        expect(dropdownElement.nativeElement).not.toHaveCssClass('open');
    });

    it('should hide calendar when document clicked', () => {
        showCalendar();
        document.body.click();
        fixture.detectChanges();
        expect(dropdownElement.nativeElement).not.toHaveCssClass('open');
    });

    it('should validate inputs with provided values', () => {
        showCalendar();

        // input
        expect(inputElement.nativeElement.value).toBe('Sep 14, 2016');

        // month navigators
        const buttons = getNavigatorButtons();
        expect(buttons[0].nativeElement.hasAttribute('disabled')).toBe(false, 'previous button should be enabled');
        expect(buttons[1].nativeElement.hasAttribute('disabled')).toBe(false, 'next button should be enabled');

        // month
        const monthSelect = fixture.debugElement.query(By.css('.calendar-month > select'));
        expect(monthSelect.nativeElement.value).toBe('8', 'month value');
        expect(monthSelect.nativeElement.options.length).toBe(12, 'month options');

        // year
        const yearSelect = fixture.debugElement.query(By.css('.calendar-year > select'));
        expect(yearSelect.nativeElement.value).toBe('2016', 'year value');
        expect(getOptionValues(yearSelect.nativeElement)).toEqual(['2015', '2016', '2017'], 'year options');

        // day
        const dayElements = fixture.debugElement.queryAll(By.css('.calendar-day'));
        const dayHeaders = dayElements.map(element => element.nativeElement.textContent.trim());
        expect(dayHeaders).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], 'day headers');
        const weekendElements = [dayElements[0], dayElements[6]];
        weekendElements.forEach(weekendElement => {
            expect(weekendElement.nativeElement.classList.contains('day-weekend')).toBe(true, 'weekend');
        });
        const weekdayElements: DebugElement[] = [];
        for (let i = 1; i <= 5; i++) {
            weekdayElements.push(dayElements[i]);
        }
        weekdayElements.forEach(weekdayElement => {
            expect(weekdayElement.nativeElement.classList.contains('day-weekend')).toBe(false, 'weekday');
        });

        // date
        const dateElements = fixture.debugElement.queryAll(By.css('.calendar-date'));
        expect(dateElements.length).toBe(42, '42 dates');
        const activeDateElement = dateElements[17];
        expect(activeDateElement.nativeElement.textContent.trim()).toBe('14', 'active date value');
        expect(activeDateElement.nativeElement.classList.contains('date-active')).toBe(true, 'active date class');
        const dateOfPreviousMonthElements: DebugElement[] = [];
        for (let i = 0; i < 4; i++) {
            dateOfPreviousMonthElements.push(dateElements[i]);
        }
        const pastDateValues = dateOfPreviousMonthElements.map(element => element.nativeElement.textContent.trim());
        expect(pastDateValues).toEqual(['28', '29', '30', '31'], 'past date values');
        dateOfPreviousMonthElements.forEach(element => {
            expect(element.nativeElement.classList.contains('date-past')).toBe(true, 'past date class');
        });
        const dateOfNextMonthElements: DebugElement[] = [];
        for (let i = 34; i < 42; i++) {
            dateOfNextMonthElements.push(dateElements[i]);
        }
        const futureDateValues = dateOfNextMonthElements.map(element => element.nativeElement.textContent.trim());
        expect(futureDateValues).toEqual(['1', '2', '3', '4', '5', '6', '7', '8'], 'future date values');
        dateOfNextMonthElements.forEach(element => {
            expect(element.nativeElement.classList.contains('date-future')).toBe(true, 'future date class');
        });
    });

    it('should throw an error if minDate > maxDate', () => {
        fixture.componentInstance.minDate = moment.utc('2015-09-14');
        fixture.componentInstance.maxDate = moment.utc('2015-09-13');
        expect(() => {
            fixture.detectChanges();
        }).toThrowError();
    });

    it('should set date = minDate if change date < minDate', () => {
        fixture.componentInstance.date = moment.utc('2015-09-12');
        fixture.detectChanges();
        expect(datePickerComponent.date.isSame(fixture.componentInstance.minDate)).toBe(true);
    });

    it('should set date = maxDate if change date > maxDate', () => {
        fixture.componentInstance.date = moment.utc('2017-09-15');
        fixture.detectChanges();
        expect(datePickerComponent.date.isSame(fixture.componentInstance.maxDate)).toBe(true);
    });

    it('shoud disable Next button when date in the month of maxDate & validate month options', () => {
        fixture.componentInstance.date = moment.utc('2017-09-12');
        fixture.detectChanges();
        const buttons = getNavigatorButtons();
        expect(buttons[1].nativeElement.hasAttribute('disabled')).toBe(true, 'disable Next button');

        // month
        const monthSelect = fixture.debugElement.query(By.css('.calendar-month > select'));
        expect(monthSelect.nativeElement.value).toBe('8', 'month value');
        expect(getOptionValues(monthSelect.nativeElement)).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8'], 'month options');
    });

    it('shoud disable Previous button when date in the month of minDate & validate month options', () => {
        fixture.componentInstance.date = moment.utc('2015-09-16');
        fixture.detectChanges();
        const buttons = getNavigatorButtons();
        expect(buttons[0].nativeElement.hasAttribute('disabled')).toBe(true, 'disable Previous button');

        // month
        const monthSelect = fixture.debugElement.query(By.css('.calendar-month > select'));
        expect(monthSelect.nativeElement.value).toBe('8', 'month value');
        expect(getOptionValues(monthSelect.nativeElement)).toEqual(['8', '9', '10', '11'], 'month options');
    });

    it('should change active date when click Next button', () => {
        const buttons = getNavigatorButtons();
        buttons[1].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(datePickerComponent.date.isSame(fixture.componentInstance.date)).toBe(true, 'date not change');

        // month
        const monthSelect = fixture.debugElement.query(By.css('.calendar-month > select'));
        expect(monthSelect.nativeElement.value).toBe('9', 'month value');

        // year
        const yearSelect = fixture.debugElement.query(By.css('.calendar-year > select'));
        expect(yearSelect.nativeElement.value).toBe('2016', 'year value');
        expect(getOptionValues(yearSelect.nativeElement)).toEqual(['2015', '2016', '2017'], 'year options');

        // date
        const dateElements = fixture.debugElement.queryAll(By.css('.calendar-date'));
        const activeDateElement = dateElements[19];
        expect(activeDateElement.nativeElement.textContent.trim()).toBe('14', 'active date value');
        expect(activeDateElement.nativeElement.classList.contains('date-active')).toBe(true, 'active date class');
    });

    it('should update component date & trigger event when select a new date', () => {
        const dateElements = fixture.debugElement.queryAll(By.css('.calendar-date'));
        const emitSpy = spyOn(datePickerComponent.dateChange, 'emit');
        dateElements[0].triggerEventHandler('click', null);
        fixture.detectChanges();
        const newActiveDate = moment.utc('2016-08-28');
        expect(datePickerComponent.date.isSame(newActiveDate)).toBe(true, 'update component date');
        expect(datePickerComponent.dateChange.emit).toHaveBeenCalledTimes(1);
        expect(datePickerComponent.date.isSame(emitSpy.calls.mostRecent().args[0])).toBe(true, 'trigger dateChange event');
    });
});
