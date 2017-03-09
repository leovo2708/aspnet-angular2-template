import * as moment from 'moment';
import { MomentFormatPipe } from './moment-format.pipe';

describe('MomentFormatPipe', () => {
    let pipe = new MomentFormatPipe();

    it('transforms null or undefined to empty string', () => {
        const emptyString = '';
        expect(pipe.transform(null)).toBe(emptyString, 'case of null');
        expect(pipe.transform(undefined)).toBe(emptyString, 'case of undefined');
    });

    it('transforms a moment date to date string', () => {
        const dateFormatString = 'MMM DD, YYYY';
        let dateString = 'Jan 01, 2013';
        let date = moment.utc(dateString, dateFormatString);
        dateString = 'Aug 08, 2016';
        date = moment.utc(dateString, dateFormatString);
        expect(pipe.transform(date)).toBe(dateString, dateString);
    });
});
