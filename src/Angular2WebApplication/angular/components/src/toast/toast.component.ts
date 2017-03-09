import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
    selector: 'nap-toast',
    templateUrl: './toast.component.html',

})

export class ToastComponent implements OnInit {
    message: string = undefined;
    @ViewChild('toast') toast: ElementRef;

    constructor(
        private toastService: ToastService
    ) { }

    ngOnInit() {
        this.toastService.activate = this.activate.bind(this);
        this.toastService.deactivate = this.deactivate.bind(this);
    }

    close() {
        this.message = undefined;
    }

    private activate(message: string): void {
        this.message = message;
    }

    private deactivate(): void {
        this.close();
    }
}
