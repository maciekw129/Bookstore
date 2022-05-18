import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import COVER_FIELD from '@salesforce/schema/Book__c.Cover__c';

export default class BookCover extends LightningElement {
    @api recordId;
    
    @wire(getRecord, {
        recordId: "$recordId",
        fields: [COVER_FIELD]
    })
    book;

    get cover() {
        return getFieldValue(this.book.data, COVER_FIELD);
    }
}