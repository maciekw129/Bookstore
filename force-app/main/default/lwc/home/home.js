import { LightningElement, track } from 'lwc';
import getBestSellers from '@salesforce/apex/OurBooksController.getBestSellers';

export default class Home extends LightningElement {
    @track bestSellers;

    connectedCallback() {
        getBestSellers()
        .then(result => {
            this.bestSellers = result;
            console.log(this.bestSellers)
        })
        .catch(error => {
            console.log(error);
        })
    }
}