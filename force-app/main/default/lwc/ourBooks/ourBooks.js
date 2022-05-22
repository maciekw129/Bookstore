import { LightningElement } from 'lwc';
import getAllBooks from '@salesforce/apex/OurBooksController.getAllBooks';
import getAllGenres from '@salesforce/apex/OurBooksController.getAllGenres';
import isGuestUser from '@salesforce/user/isGuest';

export default class OurBooks extends LightningElement {
    books;
    genres;
    isGuest = isGuestUser;
    numberOfPages;
    page = 1;
    pagesArray;
    paginationArray;

    get currentPageBooks() {
        return this.pagesArray[this.page - 1];
    }

    connectedCallback() {
        getAllBooks()
        .then(result => {
            this.books = result;
            this.createPagesArray(result);
        })
        .catch(error => {
            console.log(error);
        })

        getAllGenres()
        .then(result => {
            this.genres = result;
        })
        .catch(error => {
            console.log(error);
        })
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

    handleFilterEvent(event) {
        this.createPagesArray(
            this.books.filter(book => {
                return book.Genres__c.includes(event.detail);
            })
        )
    }

    handleClearFilters() {
        this.filteredBooks = this.books;
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
}