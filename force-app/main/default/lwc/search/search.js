import { LightningElement, track } from 'lwc';
import searchBooks from '@salesforce/apex/OurBooksController.searchBooks';
import { NavigationMixin } from 'lightning/navigation';

export default class Search extends NavigationMixin(LightningElement) {
    @track books;
    searchTerm = '';

    handleChange(event) {
        this.books = null;
        this.searchTerm = event.target.value;
        searchBooks({
            searchTerm: this.searchTerm
        })
        .then(result => {
            if(result[0].length > 0) {
                this.books = result[0];
            }
        })
    }

    handleClick(event) {
        console.log(event.currentTarget.dataset.id)
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'book__c'
            },
            state: {
                recordId: event.currentTarget.dataset.id
            }
        })
    }
}