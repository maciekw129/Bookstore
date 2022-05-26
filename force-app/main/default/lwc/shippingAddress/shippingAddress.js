import { LightningElement } from 'lwc';
import CreateOrder from '@salesforce/apex/CartController.CreateOrder';
import getShippingAddress from '@salesforce/apex/profileController.getShippingAddress';
import { NavigationMixin } from 'lightning/navigation';

export default class ShippingAddress extends NavigationMixin(LightningElement) {
    address;
    isSuccess = false;

    connectedCallback() {
        getShippingAddress()
        .then(result => {
            console.log(result)
            this.address = result;
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleValueSend(event) {
        this.userDetails = {
            ...this.userDetails,
            [event.detail.name]: event.detail.value
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        CreateOrder({
            city: this.address.City__c,
            postalCode: this.address.Postal_code__c,
            street: this.address.Street__c,
            apartment: this.address.Apartment__c,
            phone: this.address.Phone
        })
        .then(() => {
            this.isSuccess = true;
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleHomeNavigate() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            },
        })
    }
}