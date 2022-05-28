import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BreadCrumb extends NavigationMixin(LightningElement) {
    @api genres = [];
    @api bookTitle = '';

    connectedCallback() {
        this.genres = this.genres.split(';');
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