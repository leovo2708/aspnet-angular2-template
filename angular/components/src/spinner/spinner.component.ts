import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
    selector: 'nap-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: [
        './spinner.component.scss'
    ]
})
export class SpinnerComponent {
    isHide: boolean = true;
    private spinnerStateChanged: Subscription;

    constructor(
        private spinnerService: SpinnerService
    ) {
        this.spinnerStateChanged = this.spinnerService.spinnerState
            .subscribe((state: SpinnerState) => this.isHide = !state.isShow);
    }
}
