import { LightningElement, track } from 'lwc';
import searchBooks from '@salesforce/apex/OurBooksController.searchBooks';
import { NavigationMixin } from 'lightning/navigation';

export default class Search extends NavigationMixin(LightningElement) {
    @track books;
    searchTerm = '';
    timeout;

    handleChange(event) {
        console.log(this.timeout)
        if(this.timeout) {
            clearTimeout(this.timeout)
        }
        this.books = null;
        this.searchTerm = event.target.value;
        this.timeout = setTimeout(() => {
            searchBooks({
                searchTerm: this.searchTerm + '*'
            })
            .then(result => {
                if(result[0].length > 0) {
                    this.books = result[0];
                }
            }) 
        }, 1000)
    }

    handleResultClick(event) {
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

    handleSearchClick() {
        if(!this.searchTerm) {
            return
        } else {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: 'our_books__c'
                },
                state: {
                    searchTerm: this.searchTerm
                }
            })
        }
    }
}