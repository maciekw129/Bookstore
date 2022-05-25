import { LightningElement, track } from 'lwc';
import getBestSellers from '@salesforce/apex/OurBooksController.getBestSellers';
import getNewest from '@salesforce/apex/OurBooksController.getNewest';
import getMostPopularCategories from '@salesforce/apex/OurBooksController.getMostPopularCategories';

export default class Home extends LightningElement {
    @track bestSellers;
    @track newest;

    connectedCallback() {
        getBestSellers()
        .then(result => {
            this.bestSellers = result;
            console.log(this.bestSellers)
        })
        .catch(error => {
            console.log(error);
        })
        getNewest()
        .then(result => {
            this.newest = result;
            console.log(result)
        })
        .catch(error => {
            console.log(error);
        })
        getMostPopularCategories()
            .then(result => {
                console.log(result)
            })
    }
}