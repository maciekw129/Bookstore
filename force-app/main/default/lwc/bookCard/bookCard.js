import { LightningElement, api } from 'lwc';
import isGuestUser from '@salesforce/user/isGuest';
import AddItemToCart from '@salesforce/apex/CartController.AddItemToCart';
import { NavigationMixin } from 'lightning/navigation';

export default class BookCard extends NavigationMixin(LightningElement) {
    @api book;
    isGuestUser = isGuestUser;

    get genres() {
        if(this.book.Genres__c) {
            return this.book.Genres__c.split(';');
        }
    }

    handleCartClick(event) {
        event.stopPropagation();
        AddItemToCart({
            bookToAdd: this.book.Id,
            quantity: 1
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
}