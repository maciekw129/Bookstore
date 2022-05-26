import { LightningElement, api } from 'lwc';

export default class BreadCrumb extends LightningElement {
    @api genres;
    @api bookTitle;
}