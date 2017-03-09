import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SpinnerState {
    isShow: boolean;
}

@Injectable()
export class SpinnerService {
    private spinnerSubject = new Subject<SpinnerState>();
    private counter: number = 0;
    spinnerState = this.spinnerSubject.asObservable();

    show() {
        this.counter++;
        this.handleCounter();
    }

    hide() {
        this.counter--;
        this.handleCounter();
    }

    private handleCounter() {
        if (this.counter < 0) {
            this.counter = 0;
        }

        let isShow = this.counter > 0;
        this.spinnerSubject.next(<SpinnerState>{
            isShow: isShow
        });
    }
}
