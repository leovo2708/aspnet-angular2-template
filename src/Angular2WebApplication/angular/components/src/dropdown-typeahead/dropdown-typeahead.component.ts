import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

// keyboard events
const KEY_DW = 40;
const KEY_RT = 39;
const KEY_UP = 38;
const KEY_LF = 37;
const KEY_ES = 27;
const KEY_EN = 13;

export class TypeaheadQuery {
    search: (term: string) => Observable<string[]>;

    constructor(search: (term: string) => Observable<string[]>) {
        this.search = search;
    };
}

@Component({
    selector: 'nap-dropdown-typeahead',
    templateUrl: './dropdown-typeahead.component.html'
})

export class DropdownTypeaheadComponent {
    @Input() query: TypeaheadQuery;
    @Input() text: string;
    @Output() textChange = new EventEmitter<string>();
    index: number = -1;
    items: string[] = null;
    @HostListener('document:click') documentClick() {
        this.hide();
    }

    onKeydown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case KEY_LF:
            case KEY_RT:
                return;
            case KEY_ES:
                this.hide();
                return;
            case KEY_DW:
                if (this.hasItems) {
                    this.index = Math.min(this.items.length - 1, this.index + 1);
                    event.preventDefault();
                }
                return;
            case KEY_UP:
                if (this.hasItems) {
                    this.index = Math.max(0, this.index - 1);
                    event.preventDefault();
                }
                return;
            case KEY_EN:
                if (this.index !== -1) {
                    this.onItemClick(this.items[this.index]);
                    event.preventDefault();
                }
                return;
        }
    }

    onModelChange() {
        this.textChange.emit(this.text);
        let term = this.text;
        if (term.length >= 2) {
            this.search(term);
        } else {
            this.hide();
        }
    }

    onItemClick(item: string) {
        this.text = item;
        this.textChange.emit(this.text);
        this.hide();
    }

    get hasItems(): boolean {
        return this.items !== null && this.items.length > 0;
    }

    private search(term: string) {
        this.index = -1;
        this.items = ['Searching ...'];
        this.query.search(term).subscribe(items => this.items = items);
    }

    private hide() {
        this.items = null;
    }
}
