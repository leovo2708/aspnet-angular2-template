import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DatePickerComponent } from 'components/date-picker';
import { DropdownSelectComponent, DropdownSelectPipe } from 'components/dropdown-select';
import { DropdownTypeaheadComponent } from 'components/dropdown-typeahead';
import { ModalModule } from 'components/modal';
import { SpinnerComponent, SpinnerService } from 'components/spinner';
import { ToastComponent, ToastService } from 'components/toast';
import { ExceptionService } from 'components/exception.service';
import { HttpService } from 'components/http.service';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        DatePickerComponent,
        DropdownSelectComponent,
        DropdownSelectPipe,
        DropdownTypeaheadComponent,
        SpinnerComponent,
        ToastComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ModalModule.forRoot()
    ],
    providers: [
        SpinnerService,
        ToastService,
        ExceptionService,
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
