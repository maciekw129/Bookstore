import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAllBooks from '@salesforce/apex/OurBooksController.getAllBooks';
import isGuestUser from '@salesforce/user/isGuest';

export default class OurBooks extends LightningElement {
    books;
    filteredBooks;
    isGuest = isGuestUser;
    numberOfPages;
    page = 1;
    pagesArray;
    paginationArray;
    filter = '';
    searchTerm = '';

    get currentPageBooks() {
        return this.pagesArray[this.page - 1];
    }

    connectedCallback() {
        getAllBooks()
        .then(result => {
            this.books = result;
            this.filterBooks();
        })
        .catch(error => {
            console.log(error);
        })
    }

    @wire(CurrentPageReference)
    pageReference( {state} ) {
        if(state.searchTerm) {
            this.searchTerm = state.searchTerm;
        } else if(state.filter) {
            this.filter = state.filter;
        }
    }

    createPagesArray(books) {
        const numberOfPages = Math.ceil(books.length / 12);
        const pagesArray = [];
        const paginationArray = [];
        for(let i = 0; i <= numberOfPages - 1; i++) {
           pagesArray.push(books.slice(i*12, (i*12)+12));
           paginationArray.push(i+1);
        };
        this.numberOfPages = numberOfPages;
        this.pagesArray = pagesArray;
        this.paginationArray = paginationArray;
    }

    filterBooks() {
       this.createPagesArray(
        this.books.filter(book => {
            return [book.Title__c, book.Author__c, book.ISBN__c].some(value => {
                return value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
            }) && book.Genres__c.includes(this.filter);
        })
       )
    }
    
    changeColor() {
        this.template.querySelectorAll(".pagination__number").forEach(item => {
            item.value == this.page ? item.style.backgroundColor = '#F3BC5A' : item.style.backgroundColor = 'white';
        });
    }

    handleNavigatePagination(event) {
        this.page = parseInt(event.target.value);
        this.changeColor();
    }

    handleNextPage() {
        if(this.page >= this.numberOfPages) {
            return
        } else {
            this.page += 1;
            this.changeColor();
        }
    }

    handlePreviousPage() {
        if(this.page <= 1) {
            return
        } else {
            this.page -= 1;
            this.changeColor();
        }
    }

    handleFilterEvent(event) {
        console.log(event.detail)
        this.filter = event.detail;
        this.filterBooks();
    }

    handleSearchEvent(event) {
        console.log(event.detail)
        this.searchTerm = event.detail;
        this.filterBooks();
    }
}