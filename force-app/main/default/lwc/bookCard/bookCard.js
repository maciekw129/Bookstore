import { LightningElement, api } from 'lwc';
import isGuestUser from '@salesforce/user/isGuest';
import AddItemToCart from '@salesforce/apex/CartController.AddItemToCart';
import { NavigationMixin } from 'lightning/navigation';

export default class BookCard extends NavigationMixin(LightningElement) {
    @api book;
    isGuestUser = isGuestUser;
    isToastVisible = false;

    get genres() {
        if(this.book.Genres__c) {
            return this.book.Genres__c.split(';');
        }
    }

    get isBookAvailable() {
        return this.book.on_stock__c <= 0 ? false : !this.isGuestUser;
    }

    handleCartClick(event) {
        event.stopPropagation();
        AddItemToCart({
            bookToAdd: this.book.Id,
            quantity: 1
        })
        .then(() => {
            this.isToastVisible = true;
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleMoreClick() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'book__c'
            },
            state: {
                recordId: this.book.Id,
            }
        })
    }

    handleToastClose() {
        this.isToastVisible = false;
    }
}