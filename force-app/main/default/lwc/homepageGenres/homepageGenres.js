import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class HomepageGenres extends NavigationMixin(LightningElement) {
    genres = ['Crime', 'Romance', 'Fantasy', 'Biography'];

    handleClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'our_books__c'
            },
            state: {
                filter: event.target.title,
            }
        })
    }
}