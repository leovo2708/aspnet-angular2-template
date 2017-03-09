import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Helper } from './helper';

@Pipe({
    name: 'napMomentFormat'
})
export class MomentFormatPipe implements PipeTransform {
    transform(date: moment.Moment): string {
        if (_.isNil(date)) {
            return '';
        }

        return Helper.formatDate(date);
    }
}
