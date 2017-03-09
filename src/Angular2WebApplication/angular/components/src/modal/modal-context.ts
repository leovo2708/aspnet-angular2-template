import { Injectable } from '@angular/core';

@Injectable()
export class ModalContext {
    constructor(
        public data: Object
    ) { }

    close(): void { }
}
