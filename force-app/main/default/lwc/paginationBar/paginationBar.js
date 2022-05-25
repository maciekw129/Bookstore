import { LightningElement, api } from 'lwc';

export default class PaginationBar extends LightningElement {
    @api numberOfPages;
    @api page;

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