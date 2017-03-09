import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, ResponseContentType, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';
import { ToastService } from './toast/toast.service';
import { ExceptionService } from './exception.service';

@Injectable()
export class HttpService {
    constructor(
        private http: Http,
        private exceptionService: ExceptionService,
        private spinnerService: SpinnerService,
        private toastService: ToastService
    ) { }

    get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        this.toastService.deactivate();
        this.spinnerService.show();
        return this.http.get(url, options)
            .map(response => response.json())
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    post<T>(url: string, body: any): Observable<T> {
        this.toastService.deactivate();
        this.spinnerService.show();
        return this.http.post(url, body)
            .map(response => response.json())
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }

    download(url: string, body: any): Observable<Response> {
        this.toastService.deactivate();
        this.spinnerService.show();
        return this.http.post(
            url,
            body,
            new RequestOptions({
                responseType: ResponseContentType.ArrayBuffer
            }))
            .catch(this.exceptionService.catchBadResponse)
            .finally(() => this.spinnerService.hide());
    }
}
