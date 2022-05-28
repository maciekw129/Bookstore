import { LightningElement } from 'lwc';
import register from '@salesforce/apex/profileController.register';

export default class Register extends LightningElement {
    value = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    handleValueSend(event) {
        this.value = {
            ...this.value,
            [event.detail.name]: event.detail.value
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        register({
            email: this.value.email,
            firstName: this.value.firstName,
            lastName: this.value.lastName,
            password: this.value.password
        })
        .then(result => {
            console.log(result)
        })
    }
}