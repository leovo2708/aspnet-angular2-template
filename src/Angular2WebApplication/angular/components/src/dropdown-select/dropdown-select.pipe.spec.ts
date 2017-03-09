import { DropdownSelectPipe } from './dropdown-select.pipe';

describe('DropdownSelectPipe', () => {
    let pipe = new DropdownSelectPipe();

    it('transforms null or undefined to undefined', () => {
        expect(pipe.transform(null, undefined)).toBe(undefined, 'case of null');
        expect(pipe.transform(undefined, undefined)).toBe(undefined, 'case of undefined');
    });

    it('transforms a list of objects to list of SelectItem objects', () => {
        const objects: any[] = [
            {
                name: 'leo',
                age: '18'
            },
            {
                name: 'vo',
                age: '14'
            }
        ];

        const selectedItems = pipe.transform(objects, 'name');
        expect(objects.length === selectedItems.length).toBe(true, 'same length');
        expect(objects[0].name === selectedItems[0].text && objects[1].name === selectedItems[1].text).toBe(true, 'validate text');
        expect(objects[0] === selectedItems[0].value && objects[1] === selectedItems[1].value).toBe(true, 'validate value');
    });
});
