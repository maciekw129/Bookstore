import { LightningElement } from 'lwc';
import sendContactEmail from '@salesforce/apex/Utilities.sendContactEmail';

export default class ContactUs extends LightningElement {
    email = '';
    text = '';

    handleTextChange(event) {
        this.text = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleQuestionSend(event) {
        event.preventDefault();
        sendContactEmail({
            email: this.email,
            text: this.text
        })
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
    }
}