import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { SelectItem } from './dropdown-select.component';

@Pipe({
    name: 'napDropdownSelect'
})
export class DropdownSelectPipe implements PipeTransform {
    transform(objects: any[], textField: string): SelectItem[] {
        if (_.isNil(objects)) {
            return undefined;
        }

        return objects.map(object => <SelectItem>{
            text: _.isNil(textField) ? object.toString() : object[textField],
            value: object
        });
    }
}
