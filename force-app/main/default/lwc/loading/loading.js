import { LightningElement, api } from 'lwc';

export default class Loading extends LightningElement {
    @api marginTop = 0;
    @api marginBottom = 0;
    @api marginLeft = 0;
    @api marginRight = 0;

    get margins() {
        return `margin: ${marginTop} ${marginBottom} ${marginLeft} ${marginRight}`;
    }
}