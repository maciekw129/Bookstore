import { LightningElement, api } from 'lwc';

export default class TextInput extends LightningElement {
    @api inputLabel = '';
    @api inputName = '';
    @api inputPlaceholder = '';
    @api inputValue = '';
    @api inputType = 'text'

    connectedCallback() {
        return this.inputValue === undefined ? this.inputValue = '' : null
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.inputValue = value;
        const valueSend = new CustomEvent('valuesend', {
            detail: {
                name: name,
                value: value
            }
        })
        this.dispatchEvent(valueSend);
    }
}