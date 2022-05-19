import { LightningElement } from 'lwc';
import getAllOrders from '@salesforce/apex/profileController.getAllOrders';

export default class YourOrders extends LightningElement {
    orders;

    connectedCallback() {
        getAllOrders()
        .then(result => {
            this.orders = result
            console.log(result);
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleClick(event) {
        const element = event.currentTarget;
        const book = this.template.querySelector(`[data-target-id="${element.value}"]`);
        element.style.transform === "rotate(180deg)" ? element.style.transform = "rotate(0deg)" : element.style.transform = "rotate(180deg)";
        book.style.maxHeight === "500px" ? book.style.maxHeight = "0" : book.style.maxHeight = "500px";
    }
}