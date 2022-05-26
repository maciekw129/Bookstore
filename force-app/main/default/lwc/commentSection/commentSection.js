import { LightningElement, api, track } from 'lwc';
import createComment from '@salesforce/apex/OurBooksController.createComment';
import getBookComments from '@salesforce/apex/OurBooksController.getBookComments';

export default class CommentSection extends LightningElement {
    @api book;
    @track comments;

    connectedCallback() {
        getBookComments({
            bookId: this.bookId
        })
        .then(result => {
            console.log(result);
            this.comments = result;
        })
        .catch(error => {
            console.log(error);
        })
    }
}