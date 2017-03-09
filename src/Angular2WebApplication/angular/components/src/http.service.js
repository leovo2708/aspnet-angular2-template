"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var spinner_service_1 = require("./spinner/spinner.service");
var toast_service_1 = require("./toast/toast.service");
var exception_service_1 = require("./exception.service");
var HttpService = (function () {
    function HttpService(http, exceptionService, spinnerService, toastService) {
        this.http = http;
        this.exceptionService = exceptionService;
        this.spinnerService = spinnerService;
        this.toastService = toastService;
    }
    HttpService.prototype.get = function (url, options) {
        var _this = this;
        this.toastService.deactivate();
        this.spinnerService.show();
        return this.http.get(url, options)
            .map(function (response) { return response.json(); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    HttpService.prototype.post = function (url, body) {
        var _this = this;
        this.toastService.deactivate();
        this.spinnerService.show();
        return this.http.post(url, body)
            .map(function (response) { return response.json(); })
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    HttpService.prototype.download = function (url, body) {
        var _this = this;
        this.toastService.deactivate();
        this.spinnerService.show();
        return this.http.post(url, body, new http_1.RequestOptions({
            responseType: http_1.ResponseContentType.ArrayBuffer
        }))
            .catch(this.exceptionService.catchBadResponse)
            .finally(function () { return _this.spinnerService.hide(); });
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        exception_service_1.ExceptionService,
        spinner_service_1.SpinnerService,
        toast_service_1.ToastService])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map