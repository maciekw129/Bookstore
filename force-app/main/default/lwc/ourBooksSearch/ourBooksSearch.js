import { LightningElement, track, api } from 'lwc';
import getAllGenres from '@salesforce/apex/OurBooksController.getAllGenres';

export default class OurBooksSearch extends LightningElement {
    @track genres;
    @api filterValue;
    @api searchValue;
    trues = true;

    connectedCallback() {
        getAllGenres()
        .then(result => {
            console.log(result)
            this.genres = result;
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleFilterChange(event) {
        this.template.querySelector('[data-id="filterGenres"]').style.display = 'none';
        this.filterValue = event.target.dataset.value;
        const filterEvent = new CustomEvent('filterevent', {
            detail: event.target.dataset.value
        });
        this.dispatchEvent(filterEvent);
    }

    handleSearchChange(event) {
        this.searchValue = event.target.value;
        const searchEvent = new CustomEvent('searchevent', {
            detail: event.target.value
        });
        this.dispatchEvent(searchEvent);
    }

    handleClearFilter() {
        this.filterValue = '';
        const filterEvent = new CustomEvent('filterevent', {
            detail: ''
        });
        this.dispatchEvent(filterEvent);
    }

    showFilterGenres() {
        this.template.querySelector('[data-id="filterGenres"]').style.display = 'block'; 
    }

    handleClearSearch() {
        this.searchValue = '';
        const searchEvent = new CustomEvent('searchevent', {
            detail: ''
        });
        this.dispatchEvent(searchEvent);
    }
}