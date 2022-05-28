import { LightningElement, api } from 'lwc';

export default class RatingRead extends LightningElement {
    ratingArray = [1, 2, 3, 4, 5];
    @api rating; 

    renderedCallback() {
        console.log('hej')
        if(this.rating) {
            this.color(this.rating);
        } 
    }

    color(value) {
        this.template.querySelectorAll('.rating__icon').forEach(star => {
            star.value <= value ? star.classList.add('rating__star-yellow') : star.classList.remove('rating__star-yellow');
        });
    }
}