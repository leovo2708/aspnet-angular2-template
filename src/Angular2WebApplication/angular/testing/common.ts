import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

@Component({
    selector: 'nap-test',
    template: ''
})
export class TestComponent {
}

export function createGenericTestComponent<T>(html: string, type: { new (...args: any[]): T }): ComponentFixture<T> {
    TestBed.overrideComponent(type, { set: { template: html } });
    const fixture = TestBed.createComponent(type);
    fixture.detectChanges();
    return fixture as ComponentFixture<T>;
}

export const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

export class EventHelper<T> {
    constructor(
        private fixture: ComponentFixture<T>
    ) { }

    raiseInputEvent(inputElement: HTMLInputElement, text: string): Promise<any> {
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input'));
        this.fixture.detectChanges();
        return this.fixture.whenStable();
    }

    raiseClickEvent(element: HTMLElement): Promise<any> {
        element.click();
        this.fixture.detectChanges();
        return this.fixture.whenStable();
    }

    raiseKeydownEvent(element: HTMLElement, code: string): Promise<any> {
        let event = new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            code: code
        });
        element.dispatchEvent(event);
        this.fixture.detectChanges();
        return this.fixture.whenStable();
    }

    raiseEvent(element: HTMLElement, event: Event): Promise<any> {
        element.dispatchEvent(event);
        this.fixture.detectChanges();
        return this.fixture.whenStable();
    }
}
