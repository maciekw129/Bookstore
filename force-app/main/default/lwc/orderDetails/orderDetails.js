import { LightningElement, api, track } from 'lwc';
import getOrderedItems from '@salesforce/apex/orderDetailsController.getOrderedItems';

import NAME_FIELD from '@salesforce/schema/Order__c.Name';
import DATE_FIELD from '@salesforce/schema/Order__c.Order_date__c';
import CREATEDBY_FIELD from '@salesforce/schema/Order__c.CreatedById';
import STATUS_FIELD from '@salesforce/schema/Order__c.Order_status__c';
import CITY_FIELD from '@salesforce/schema/Order__c.city__c';
import POSTALCODE_FIELD from '@salesforce/schema/Order__c.postal_code__c';
import STREET_FIELD from '@salesforce/schema/Order__c.street__c';
import APARTMENT_FIELD from '@salesforce/schema/Order__c.apartment__c';

const columns = [
    { label: 'Quantity', fieldName: 'Quantity' },
    { label: 'Name', fieldName: 'NameUrl', type: 'url',
    typeAttributes: {
        label: {
            fieldName: 'Name'
        },
        target: '_blank'
    }
    },
    { label: 'Author', fieldName: 'Author', type: 'text' },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { label: 'ISBN', fieldName: 'ISBN' },
];

export default class OrderDetails extends LightningElement {
    @api recordId;
    @api objectApiName;
    dateField = DATE_FIELD;
    nameField = NAME_FIELD;
    createdByField = CREATEDBY_FIELD;
    statusField = STATUS_FIELD;
    cityField = CITY_FIELD;
    postalCodeField = POSTALCODE_FIELD;
    streetField = STREET_FIELD;
    apartmentField = APARTMENT_FIELD;
    columns = columns;
    @track bookList;
    errors

    handleOrderedItemsActive() {
        getOrderedItems({
            orderId: this.recordId
        })
        .then((result) => {
            this.bookList = result.map(book => {
                return {
                    Quantity: book.Quantity__c,
                    Name: book.Book__r.Name,
                    NameUrl: `/${book.Book__r.Id}`,
                    Title: book.Book__r.Title__c,
                    Author: book.Book__r.Author__c,
                    ISBN: book.Book__r.ISBN__c,
                }
            })
            this.errors = undefined;
        }).catch((e) => {
            this.bookList = undefined;
            this.errors = e;
        })
    }
}