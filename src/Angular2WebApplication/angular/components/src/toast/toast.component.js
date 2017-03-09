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
var toast_service_1 = require("./toast.service");
var ToastComponent = (function () {
    function ToastComponent(toastService) {
        this.toastService = toastService;
        this.message = undefined;
    }
    ToastComponent.prototype.ngOnInit = function () {
        this.toastService.activate = this.activate.bind(this);
        this.toastService.deactivate = this.deactivate.bind(this);
    };
    ToastComponent.prototype.close = function () {
        this.message = undefined;
    };
    ToastComponent.prototype.activate = function (message) {
        this.message = message;
    };
    ToastComponent.prototype.deactivate = function () {
        this.close();
    };
    return ToastComponent;
}());
__decorate([
    core_1.ViewChild('toast'),
    __metadata("design:type", core_1.ElementRef)
], ToastComponent.prototype, "toast", void 0);
ToastComponent = __decorate([
    core_1.Component({
        selector: 'nap-toast',
        templateUrl: './toast.component.html',
    }),
    __metadata("design:paramtypes", [toast_service_1.ToastService])
], ToastComponent);
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=toast.component.js.map