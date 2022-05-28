import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Toast extends NavigationMixin(LightningElement) {
    @api buttonText = '';
    @api message = '';
    @api isCartToast = false;

    handleClick() {
        const toastEvent = new CustomEvent('toastevent');
        this.dispatchEvent(toastEvent);
    }

    handleCartNavigate() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Cart__c'
            }
        })
    }
}