import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getSpecificBook from '@salesforce/apex/OurBooksController.getSpecificBook';
import AddItemToCart from '@salesforce/apex/CartController.AddItemToCart';
import getSimilarBooks from '@salesforce/apex/OurBooksController.getSimilarBooks';
import isGuestUser from '@salesforce/user/isGuest';
import getBookRate from '@salesforce/apex/OurBooksController.getBookRate';

export default class BookDetail extends LightningElement {
    @track book = {};
    counter = 1;
    isToastVisible = false;
    sameAuthorBooks = [];
    isGuest = isGuestUser;
    rating;
    @track visibility = {
        isCommentsVisible: false,
        isSimilarBooksVisible: false,
        isBookDetailsVisible: false
    }

    @wire(CurrentPageReference)
    pageReference( {state} ) {
        if(state.recordId) {
            try {
                getSpecificBook({
                    bookId: state.recordId
                })
                .then(result => {
                    console.log(result)
                    this.book = result
                    this.visibility.isBookDetailsVisible = true
                    this.visibility.isCommentsVisible = true
                })
                getSimilarBooks({
                    bookId: state.recordId
                })
                .then(result => {
                    this.sameAuthorBooks = result
                    this.visibility.isSimilarBooksVisible = true
                })
                getBookRate({
                    bookId: state.recordId
                })
                .then(result => {
                    console.log(result);
                    this.rating = result
                })

            } catch(error) {
                console.log(error)
            }
        }
    }

    get bookAvailability() {
        return this.book.Availability__c === 'Temporarily unavailable';
    }

    get AvailabilityStyle() {
        if(this.book.Availability__c === 'Available') {
            return 'book__availability book__availability-available'
        } else if(this.book.Availability__c === 'Temporarily unavailable') {
            return 'book__availability book__availability-unavailable'
        } else {
            return 'book__availability book__availability-little'
        }
    }

    increment() {
        if(this.counter < this.book.on_stock__c) {
            this.counter += 1; 
        }
    }

    decrement() {
        if(this.counter > 0) {
            this.counter -= 1;  
        }
    }

    handleCartClick(event) {
        event.stopPropagation();
            AddItemToCart({
                bookToAdd: this.book.Id,
                quantity: this.counter
            })
            .then(() => {
                this.isToastVisible = true;
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleToastClose() {
        this.isToastVisible = false;
    }
}