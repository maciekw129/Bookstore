import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
    @api text;
    @api buttonType
}