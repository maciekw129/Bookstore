import { LightningElement, api } from 'lwc';
import  validate  from 'c/validate';

export default class TextInput extends LightningElement {
    @api inputLabel = '';
    @api inputName = '';
    @api inputPlaceholder = '';
    @api inputValue = '';
    @api inputType = 'text';
    @api readOnly = false;
    isCorrect = true;

    connectedCallback() {
        return this.inputValue === undefined ? this.inputValue = '' : null
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.isCorrect = validate(name, value);
        if(!this.isCorrect) return;
        this.inputValue = value;
        const valueSend = new CustomEvent('valuesend', {
            detail: {
                name: name,
                value: value
            }
        })
        this.dispatchEvent(valueSend);
    }

    get inputStyle() {
        return `input ${this.isCorrect || 'input--wrong'}`
    }
}