import { LightningElement, track } from 'lwc';
import GetCartItems from '@salesforce/apex/CartController.GetCartItems';
import DeleteAllItemsFromCart from '@salesforce/apex/CartController.DeleteAllItemsFromCart';
import SubstractQuantity from '@salesforce/apex/CartController.SubstractQuantity';
import AddQuantity from '@salesforce/apex/CartController.AddQuantity';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

export default class Cart extends NavigationMixin(LightningElement) {
    @track cartItems = [];
    prizeSum;

    connectedCallback() {
        this.getCartItems();
    }

    getCartItems() {
        GetCartItems()
        .then(result => {
            this.cartItems = result;
            console.log(result)
            this.reduc();
        })
    }

    reduc() {
        console.log(this.cartItems.reduce((prev, curr) => {
            return prev + curr.Prize_sum__c;
        }))
    }

    get totalPrize() {
        return this.cartItems.reduce((previous, current) => {
            return previous + current.Prize_sum__c
        })
    }
    

    handleSubstractClick(event) {
        const index = event.target.value;
        SubstractQuantity({
            cartItemId: this.cartItems[index].Id
        })
        .then(() => {
            this.getCartItems();
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleAddClick(event) {
        const index = event.target.value;
        AddQuantity({
            cartItemId: this.cartItems[index].Id
        })
        .then(() => {
            this.getCartItems();
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleComplete() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: basePath + '/create-order'
            }
        })
    }

    handleClear() {
        DeleteAllItemsFromCart()
        .then(() => {
            this.getCartItems();
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleCheckOutOurBooks() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'our_books__c'
            }
        })
    }
}