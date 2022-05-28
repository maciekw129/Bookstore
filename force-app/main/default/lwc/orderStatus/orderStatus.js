import { LightningElement, api, wire, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Order__c.Id';
import STATUS_FIELD from '@salesforce/schema/Order__c.Order_status__c';

export default class OrderStatus extends LightningElement {
    @api recordId;
    @track status;
    @track error;
    @track visible = false;
    @track nextStatus;
    buttonTypeClicked;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [STATUS_FIELD]
    })
    wiredOrder({ error, data }) {
        if (data) {
            this.status = getFieldValue(data, STATUS_FIELD);
            this.error = undefined;
            if(this.status === 'New') {
                this.nextStatus = 'In progress';
            } else {
                this.nextStatus = 'Realized';
            }
        } else if (error) {
            this.status = undefined;
            this.error = error;
        }
    }

    get title() {
        return `Order status - ${this.status}`;
    }

    get buttonLabel() {
        return `Set ${this.nextStatus}`
    }

    get isCancelButtonDisabled() {
        return this.status === 'Canceled';
    }

     get isNextStatusButtonDisabled() {
        return this.status === 'Realized' ? true : this.status === 'Canceled';
    }

    handleClick(event) {
        this.visible = true;
        this.buttonTypeClicked = event.target.name;
    }

    handleDialog(event) {
        if(event.detail === 'Cancel') {
            this.visible = false;
        } else if(event.detail === 'Confirm') {
            this.updateStatusField()
        }
    }

    updateStatusField() {
        const fields = {}
        fields[ID_FIELD.fieldApiName] = this.recordId;
        if(this.buttonTypeClicked === 'Canceled') {
            fields[STATUS_FIELD.fieldApiName] = 'Canceled';
        } else {
            fields[STATUS_FIELD.fieldApiName] = this.nextStatus;
        }

        const recordInput = {
            fields: fields
        }

        updateRecord(recordInput)
        .then(() => {
            this.visible = false;
          });
    }
}