import { Injectable } from '@angular/core';
import { ModalContainerDirective } from './modal-container.directive';
import { ModalRef } from './modal-ref';
import { ModalOptions } from './modal-options';

@Injectable()
export class ModalStackService {
    private modalContainerDirective: ModalContainerDirective;

    open(content: any, options: ModalOptions, data: Object): ModalRef {
        if (!this.modalContainerDirective) {
            throw new Error('Missing modal container, add <template ngbModalContainer></template> to one of your application templates.');
        }

        return this.modalContainerDirective.open(content, options, data);
    }

    registerContainer(modalContainerDirective: ModalContainerDirective) {
        this.modalContainerDirective = modalContainerDirective;
    }
}
