import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BreadCrumb extends NavigationMixin(LightningElement) {
    @api genres = '';
    @api bookTitle = '';

    get splittedGenres() {
        return this.genres ? this.genres = this.genres.split(';') : null;
    }

    handleOurBooksNavigate() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'our_books__c'
            },
        })
    }

    handleGenreNavigate(event) {
        console.log(event.currentTarget.textContent)
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'our_books__c'
            },
            state: {
                filter: event.currentTarget.textContent
            }
        })
    }
}