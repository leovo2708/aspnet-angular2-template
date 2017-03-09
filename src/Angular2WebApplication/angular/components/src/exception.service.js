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
var rxjs_1 = require("rxjs");
var toast_service_1 = require("./toast/toast.service");
var ExceptionService = (function () {
    function ExceptionService(toastService) {
        var _this = this;
        this.toastService = toastService;
        this.catchBadResponse = function (response) {
            _this.handleError(response);
            return rxjs_1.Observable.of();
        };
    }
    ExceptionService.prototype.handleError = function (response) {
        var defaultMessage = 'Sorry, an error occurred while processing your request, please notify the administrators.';
        var errorMessage = '';
        var contentType = response.headers.get('content-type');
        if (contentType === 'text/html; charset=utf-8') {
            errorMessage = defaultMessage;
        }
        else {
            var error = response.json();
            errorMessage = error.errorMessage || defaultMessage;
        }
        this.toastService.activate(errorMessage);
    };
    return ExceptionService;
}());
ExceptionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [toast_service_1.ToastService])
], ExceptionService);
exports.ExceptionService = ExceptionService;
//# sourceMappingURL=exception.service.js.map