import { LightningElement, api } from 'lwc';
import getSpecificUserDetails from '@salesforce/apex/profileController.getSpecificUserDetails';

export default class Comment extends LightningElement {
    @api text = '';
    @api authorId = '';
    @api rate = '';
    author = '';
    rating = '';

    connectedCallback() {
        getSpecificUserDetails({
            userId: this.authorId
        })
        .then(result => {
            this.author = result[0];
        })
        .catch(error => {
            console.log(error);
        })
    }
}