import { LightningElement, track } from 'lwc';
import GetCartItems from '@salesforce/apex/CartController.GetCartItems';
import SubstractQuantity from '@salesforce/apex/CartController.SubstractQuantity';
import AddQuantity from '@salesforce/apex/CartController.AddQuantity';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

export default class Cart extends NavigationMixin(LightningElement) {
    @track cartItems;

    connectedCallback() {
        this.getCartItems();
    }

    getCartItems() {
        GetCartItems()
        .then(result => {
            this.cartItems = result;
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
}