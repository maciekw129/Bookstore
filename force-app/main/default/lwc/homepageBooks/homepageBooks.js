import { LightningElement, api } from 'lwc';

export default class HomepageBooks extends LightningElement {
    @api title;
    @api books;

    connectedCallback() {
        console.log('books: ' + this.books.data)
        console.log('title: ' + this.title)
    }

}