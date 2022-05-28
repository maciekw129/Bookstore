import { LightningElement, track } from 'lwc';
import getCustomers from '@salesforce/apex/customersController.getCustomers';

const columns = [
    { label: 'First name', fieldName: 'FirstName' },
    { label: 'Last name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];

export default class CustomersPage extends LightningElement {
    @track customers;
    errors;
    columns = columns;

    handleCustomersActive() {
        getCustomers()
        .then((result) => {
           this.customers = result;
           this.errors = null; 
        })
        .catch((error) => {
            this.customers = null;
            this.errors = error;
        })
    }

    connectedCallback() {
        this.handleCustomersActive();
    }
}