import { LightningElement, track } from 'lwc';
import getAllBooks from '@salesforce/apex/OurBooksController.getAllBooks';
import isGuestUser from '@salesforce/user/isGuest';

export default class OurBooks extends LightningElement {
    @track books = {};
    @track isLoading = true;
    @track errorMessage;
    isGuest = isGuestUser;
    numberOfPages;
    page = 1;

    connectedCallback() {
        getAllBooks()
        .then(result => {
            this.books = result;
            this.isLoading = false;
            this.numberOfPages = Math.ceil(this.books.length / 12);
        })
        .catch(error => {
            console.log(error)
        })
    }
}