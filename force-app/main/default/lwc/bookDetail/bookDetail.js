import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getSpecificBook from '@salesforce/apex/OurBooksController.getSpecificBook';
import AddItemToCart from '@salesforce/apex/CartController.AddItemToCart';
import getSimilarBooks from '@salesforce/apex/OurBooksController.getSimilarBooks';
import isGuestUser from '@salesforce/user/isGuest';

export default class BookDetail extends LightningElement {
    book = {};
    @track counter = 1;
    isToastVisible = false;
    sameAuthorBooks = [];
    isGuest = isGuestUser;

    @wire(CurrentPageReference)
    pageReference( {state} ) {
        if(state.recordId) {
            getSpecificBook({
                bookId: state.recordId
            })
            .then((result) => {
                this.book = result;
                getSimilarBooks({
                    bookId: this.book.Id
                }) 
                .then(result => {
                    this.sameAuthorBooks = result;
                }) 
            })
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