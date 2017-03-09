import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExceptionService } from '../exception.service';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../toast/toast.service';

describe('ToastComponent', () => {
    let fixture: ComponentFixture<ToastComponent>;
    const message = 'Test message';

    function activate() {
        let toastService: ToastService = TestBed.get(ToastService);
        toastService.activate(message);
    }

    function deactivate() {
        let toastService: ToastService = TestBed.get(ToastService);
        toastService.deactivate();
    }

    function verifyWhenHidding() {
        expect(fixture.componentInstance.message).toBe(undefined, 'message should be undefined');
        let toastContainer = fixture.debugElement.query(By.css('.toast-container'));
        expect(toastContainer.nativeElement.hidden).toBe(true, 'hide element');
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ToastComponent
            ],
            providers: [
                ExceptionService,
                ToastService
            ]
        });

        fixture = TestBed.createComponent(ToastComponent);
    });

    it('should hide by default', () => {
        fixture.detectChanges();
        verifyWhenHidding();
    });

    it('should show a message when activating it', () => {
        activate();
        fixture.detectChanges();
        expect(fixture.componentInstance.message).toBe(message, 'show a correct message');
        let toastContainer = fixture.debugElement.query(By.css('.toast-container'));
        expect(toastContainer.nativeElement.hidden).toBe(false, 'show element');
    });

    it('should hide the message when click Close button', () => {
        activate();
        fixture.detectChanges();
        let closeButton = fixture.debugElement.query(By.css('button'));
        closeButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        verifyWhenHidding();
    });

    it('should hide the message when deactivating it', () => {
        activate();
        fixture.detectChanges();
        deactivate();
        fixture.detectChanges();
        verifyWhenHidding();
    });
});
