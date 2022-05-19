import { LightningElement, api } from 'lwc';

export default class HomepageBooks extends LightningElement {
    @api title;
    @api books;
    page = 0;

    get numberOfPages() {
        return this.books.length / 3 - 1;
    }

    get translateCounter() {
        return `translateX(-${this.page * 300}%)`;
    }

    translate() {
        this.template.querySelectorAll(".books__book").forEach(item => {
            Object.assign( item.style, {transform: this.translateCounter});
        });
    }

    handleLeftClick() {
        if(this.page <= 0) {
            return
        }
        this.page -= 1;
        this.translate();
    }

    handleRightClick() {
        if(this.page >= this.numberOfPages) {
            return
        }
        this.page += 1;
        this.translate();
    }

}