import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Footer extends NavigationMixin(LightningElement) {
    handleNavigate(event) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: event.target.dataset.value
            }
        })
    }
}