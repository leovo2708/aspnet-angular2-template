import {
    Directive, ViewContainerRef, TemplateRef, ComponentFactory, ComponentFactoryResolver,
    Injector, Renderer, ReflectiveInjector
} from '@angular/core';
import { ModalStackService } from './modal-stack.service';
import { ModalWindowComponent } from './modal-window.component';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalRef } from './modal-ref';
import { ModalContext } from './modal-context';
import { ContentRef } from './content-ref';
import { ModalOptions } from './modal-options';

@Directive({
    selector: 'template[napModalContainer]',
})
export class ModalContainerDirective {
    private index = 0;
    private windowFactory: ComponentFactory<ModalWindowComponent>;
    private backdropFactory: ComponentFactory<ModalBackdropComponent>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
        private renderer: Renderer,
        private modalStackService: ModalStackService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.windowFactory = componentFactoryResolver.resolveComponentFactory(ModalWindowComponent);
        this.backdropFactory = componentFactoryResolver.resolveComponentFactory(ModalBackdropComponent);
        modalStackService.registerContainer(this);
    }

    open(content: any, options: ModalOptions, data: Object): ModalRef {
        const activeModal = new ModalContext(data);
        const contentRef = this.getContentRef(content, options, activeModal);
        const windowComponentRef = this.viewContainerRef.createComponent(this.windowFactory, this.index++, this.injector, contentRef.nodes);
        windowComponentRef.instance.options = options;
        const backdropComponentRef = this.viewContainerRef.createComponent(this.backdropFactory, this.index++, this.injector);
        let modalRef = new ModalRef(this.viewContainerRef, windowComponentRef, backdropComponentRef, contentRef.viewRef);
        activeModal.close = () => {
            this.index -= 2;
            modalRef.close();
        };
        return modalRef;
    }

    private getContentRef(content: any, options: ModalOptions, context: ModalContext): ContentRef {
        if (!content) {
            return new ContentRef([]);
        } else if (content instanceof TemplateRef) {
            const embeddedViewRef = this.viewContainerRef.createEmbeddedView(content, context);
            return new ContentRef([embeddedViewRef.rootNodes], embeddedViewRef);
        } else if (typeof content === 'string') {
            return new ContentRef([[this.renderer.createText(null, `${content}`)]]);
        } else {
            const contentComponentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
            const modalContentInjector = ReflectiveInjector.resolveAndCreate([
                { provide: ModalContext, useValue: context },
                { provide: ModalOptions, useValue: options }
            ], this.injector);
            const componentRef = this.viewContainerRef.createComponent(contentComponentFactory, 0, modalContentInjector);
            return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
    }
}
