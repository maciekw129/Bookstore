import { LightningElement, api } from 'lwc';

export default class HomepageBooks extends LightningElement {
    @api title;
    @api books;
    page = 0;
    cardsOnPage;

    connectedCallback() {
        const firstBreakpoint = window.matchMedia('(max-width: 700px)');
        const secondBreakpoint = window.matchMedia('(max-width: 1050px)');
        if(firstBreakpoint.matches) {
            this.cardsOnPage = 1;
        } else if (secondBreakpoint.matches) {
            this.cardsOnPage = 2;
        } else {
            this.cardsOnPage = 3;
        }
    }

    get isLeftButtonDisabled() {
        return this.page <= 0;
    }

    get isRightButtonDisabled() {
        return this.page >= this.numberOfPages - 1;
    }

    get numberOfPages() {
        return this.books.length / this.cardsOnPage;
    }

    get translateCounter() {
        return `translateX(-${(this.page * this.cardsOnPage * 100)}%)`;
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
        if(this.page >= this.numberOfPages - 1) {
            return
        }
        this.page += 1;
        this.translate();
    }

}