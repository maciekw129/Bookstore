import { LightningElement } from 'lwc';
import getAllOrders from '@salesforce/apex/profileController.getAllOrders';

export default class YourOrders extends LightningElement {
    orders;

    connectedCallback() {
        getAllOrders()
        .then(result => {
            console.log(result);
            this.orders = result.map(order => {
                return {...order, Order_date__c: new Date(order.Order_date__c).toLocaleDateString() };
            });
            console.log(JSON.stringify(this.orders));
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleClick(event) {
        const index = event.currentTarget.dataset.value;
        const book = this.template.querySelector(`[data-id="${index}"]`);
        const numberOfItems = this.orders[index].Order_Items__r.length;
        book.style.maxHeight === `${numberOfItems * 64}px` ? book.style.maxHeight = "0" : book.style.maxHeight = `${numberOfItems * 64}px`;
    }
}