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
            console.log('I search!')
            searchBooks({
                searchTerm: this.searchTerm
            })
            .then(result => {
                if(result[0].length > 0) {
                    this.books = result[0];
                }
            }) 
        }, 2000)
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