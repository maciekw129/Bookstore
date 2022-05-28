import { LightningElement } from 'lwc';

export default class ConfirmationDialog extends LightningElement {
    buttonType;

    handleClick(event) {
        this.buttonType = event.target.title

        const dialogEvent = new CustomEvent("dialog", {
            detail: this.buttonType
        });
        
        this.dispatchEvent(dialogEvent);
    }
}