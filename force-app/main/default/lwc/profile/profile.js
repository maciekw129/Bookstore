import { LightningElement } from 'lwc';

export default class Profile extends LightningElement {
    isAboutYouPageVisible = true;
    isYourOrdersPageVisible = false;

    handleAboutYouClick() {
        this.isAboutYouPageVisible = true;
        this.isYourOrdersPageVisible = false;
    }

    handleYourOrdersClick() {
        this.isAboutYouPageVisible = false;
        this.isYourOrdersPageVisible = true;
    }

}