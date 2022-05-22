import { LightningElement, api } from 'lwc';

export default class BookFilter extends LightningElement {
    @api value;

    handleClick() {
        const filterEvent = new CustomEvent('filterevent', {
            detail: this.value
        });
        this.dispatchEvent(filterEvent);
    }
}