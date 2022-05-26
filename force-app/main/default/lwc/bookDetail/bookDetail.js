import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getSpecificBook from '@salesforce/apex/OurBooksController.getSpecificBook';
import AddItemToCart from '@salesforce/apex/CartController.AddItemToCart';
import getSimilarBooks from '@salesforce/apex/OurBooksController.getSimilarBooks';

export default class BookDetail extends LightningElement {
    book;
    @track counter = 1;
    isToastVisible = false;
    sameAuthorBooks;

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
                    console.log(`result = ${result}`);
                    this.sameAuthorBooks = result;
                }) 
            })

        }
    }

    connectedCallback() {
        
    }

    get AvailabilityStyle() {
        return this.book.Availability__c === 'Available' ? 'book__availability book__availability-available' : this.book.Availability__c === 'Temporarily unavailable' ? 'book__availability book__availability-unavailable' : 'book__availability book__availability-little' ;
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