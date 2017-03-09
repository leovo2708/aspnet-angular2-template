import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

export interface SelectItem {
    text: string;
    value: any;
}

@Component({
    selector: 'nap-dropdown-select',
    templateUrl: './dropdown-select.component.html'
})

export class DropdownSelectComponent implements OnChanges {
    @Input() items: SelectItem[];
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (!_.isNil(this.items) && !_.isNil(this.value)) {
            this.updateModel();
        }
    }

    private updateModel() {
        if (!_.isNil(this.items)) {
            for (let item of this.items) {
                if (item.value === this.value || _.isEqual(item.value, this.value)) {
                    this.onModelChange(item.value);
                    return;
                }
            }

            this.onModelChange(this.items[0].value);
        }
    }

    onModelChange(newValue: any) {
        if (this.value !== newValue) {
            this.value = newValue;
            this.valueChange.emit(newValue);
        }
    }
}
