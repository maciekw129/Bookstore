import { LightningElement, track } from 'lwc';
import getBestSellers from '@salesforce/apex/OurBooksController.getBestSellers';
import getNewest from '@salesforce/apex/OurBooksController.getNewest';
import getBooksOneGenre from '@salesforce/apex/OurBooksController.getBooksOneGenre';

export default class Home extends LightningElement {
    @track bestSellers = [];
    @track newest = [];
    @track crimeBooks = [];
    @track fantasyBooks = [];

    connectedCallback() {
        getBestSellers()
        .then(result => {
            this.bestSellers = result;
        })
        .catch(error => {
            console.log(error);
        })
        getNewest()
        .then(result => {
            this.newest = result;
        })
        .catch(error => {
            console.log(error);
        })
        getBooksOneGenre({
            genre: 'Crime'
        })
        .then(result => {
            this.crimeBooks = result;
        })
        .catch(error => {
            console.log(error)
        })
        getBooksOneGenre({
            genre: 'Fantasy'
        })
        .then(result => {
            this.fantasyBooks = result;
        })
        .catch(error => {
            console.log(error)
        })
    }
}