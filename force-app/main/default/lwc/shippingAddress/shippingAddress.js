import { LightningElement, track } from 'lwc';
import CreateOrder from '@salesforce/apex/CartController.CreateOrder';

export default class ShippingAddress extends LightningElement {
    address = {
        city: '',
        postalCode: '',
        street: '',
        apartment: '',
        phone: ''
    };
    @track isSuccess = false;

    handleChange(event) {
        const { name, value } = event.target;
        this.address = {...this.address, [name]: value};
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        CreateOrder({
            city: this.address.city,
            postalCode: this.address.postalCode,
            street: this.address.street,
            apartment: this.address.apartment,
            phone: this.address.phone
        })
        .then(() => {
            this.isSuccess = true;
        })
        .catch(error => {
            console.log(error);
        })
    }
}