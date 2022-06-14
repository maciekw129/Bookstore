import { LightningElement, track } from 'lwc';
import getUserDetails from '@salesforce/apex/profileController.getUserDetails';
import updateUserDetails from '@salesforce/apex/profileController.updateUserDetails';

export default class Profile extends LightningElement {
    isAboutYouPageVisible = true;
    isYourOrdersPageVisible = false;
    userDetails = [];
    isToastVisible = false;
    readOnly = true;

    connectedCallback() {
        getUserDetails()
        .then(result => {
            this.userDetails = result[0];
        })
    }

    handleAboutYouClick(event) {
        this.clearColor();
        event.currentTarget.style.color = '#F3BC5A';
        this.isAboutYouPageVisible = true;
        this.isYourOrdersPageVisible = false;
    }

    handleYourOrdersClick(event) {
        this.clearColor();
        event.currentTarget.style.color = '#F3BC5A';
        this.isAboutYouPageVisible = false;
        this.isYourOrdersPageVisible = true;
    }

    clearColor() {
        this.template.querySelectorAll(".nav__item").forEach(item => {
            item.style.color = 'black';
        });
    }

    handleValueSend(event) {
        this.userDetails = {
            ...this.userDetails,
            [event.detail.name]: event.detail.value
        }
    }

    handleEditClick() {
        this.readOnly = !this.readOnly;
    }

    handleCancelClick() {
        this.readOnly = true;
        getUserDetails()
        .then(result => {
            this.userDetails = result[0];
        })
    }

    handleUpdateClick() {
        const { FirstName, LastName, Phone, City__c, Postal_code__c, Street__c, Apartment__c } = this.userDetails;
        updateUserDetails({
            FirstName: FirstName,
            LastName: LastName,
            Phone: Phone,
            City: City__c,
            PostalCode: Postal_code__c,
            Street: Street__c,
            Apartment: Apartment__c,
        })
        .then(() => {
            this.isToastVisible = true;
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleToastClose() {
        this.isToastVisible = false;
    }

}