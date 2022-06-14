import { LightningElement, api, track } from 'lwc';
import createComment from '@salesforce/apex/OurBooksController.createComment';
import getBookComments from '@salesforce/apex/OurBooksController.getBookComments';
import isGuestUser from '@salesforce/user/isGuest';

export default class CommentSection extends LightningElement {
    @api book = {};
    @track comments = [];
    isGuest = isGuestUser;
    comment = '';
    rating = 5;

    connectedCallback() {
        console.log(this.book.Id);
        getBookComments({
            bookId: this.book.Id
        })
        .then(result => {
            
            this.comments = result;
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleCommentChange(event) {
        this.comment = event.target.value;
    }

    handleCreateComment() {
        if(this.comment) {
            createComment({
                bookId: this.book.Id,
                text: this.comment,
                rate: this.rating
            })
            .then(() => {
                getBookComments({
                    bookId: this.book.Id
                })
                .then(result => {
                    this.comments = result;
                })
                this.template.querySelector('.comment__area').value = '';
            })
            .catch(error => {
                console.log(error)
            })
        } else {
            return
        }
    }

    handleSetRating(event) {
        this.rating = event.detail;
    }
}