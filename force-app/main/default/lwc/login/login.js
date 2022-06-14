import { LightningElement } from 'lwc';
import login from '@salesforce/apex/profileController.login';
import { NavigationMixin } from 'lightning/navigation';

export default class Login extends NavigationMixin(LightningElement) {
    value = {
        email: '',
        password: '',
    }
    error = ' ';

    handleValueSend(event) {
        this.value = {
            ...this.value,
            [event.detail.name]: event.detail.value
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        login({
            email: this.value.email,
            password: this.value.password
        }).then((result) => {
            window.open(result, '_self');
        })
        .catch(error => {
            console.log(error)
            this.error = error.body.message;
        })
    }
}