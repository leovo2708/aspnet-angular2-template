import { Injectable } from '@angular/core';
import { ModalStackService } from './modal-stack.service';
import { ModalRef } from './modal-ref';
import { ModalOptions } from './modal-options';

@Injectable()
export class ModalService {
    constructor(
        private modalStackService: ModalStackService
    ) { }

    open(content: any, options: ModalOptions = undefined, data: Object = undefined): ModalRef {
        return this.modalStackService.open(content, options, data);
    }
}
