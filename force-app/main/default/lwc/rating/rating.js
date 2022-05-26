import { LightningElement } from 'lwc';

export default class Rating extends LightningElement {
    ratingArray = [1, 2, 3, 4, 5];

    handleClick(event) {
        this.color(event.target.value);
        const ratingEvent = new CustomEvent('rating', {
            detail: event.target.value
        });
        this.dispatchEvent(ratingEvent);
    }

    color(value) {
        this.template.querySelectorAll('.rating__icon').forEach(star => {
            star.value <= value ? star.classList.add('rating__star-yellow') : star.classList.remove('rating__star-yellow');
        });
    }
}