import { LightningElement, wire, track } from 'lwc';
import getAllBooks from '@salesforce/apex/OurBooksController.getAllBooks';
import isGuestUser from '@salesforce/user/isGuest';

export default class OurBooks extends LightningElement {
    @track books;
    @track isLoading = true;
    @track errorMessage;
    isGuest = isGuestUser;

    @wire(getAllBooks)
    wiredBooks({ error, data }) {
        if(data) {
            console.log(data);
            this.books = data;
            this.isLoading = false;
        } else if(error) {
            this.books = undefined;
            this.isLoading = false;
            this.errorMessage = 'Something went wrong, try refresh the page.'
            console.log(error);
        }
    }
}