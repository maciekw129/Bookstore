import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

export default class NavigationMenuItem extends NavigationMixin(LightningElement) {
    @api item = {};
    @track href = 'javascript:void(0)';
    pageReference;

    connectedCallback() {
        const { type, target, defaultListViewId } = this.item;
        if(type === 'SalesforceObject') {
            this.pageReference = {
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: target
                },
                state: {
                    filterName: defaultListViewId
                }
            }
        } else if (type === 'InternalLink') {
            this.pageReference = {
                type: 'standard__webPage',
                attributes: {
                    url: basePath + target
                }
            }
        } else if (type === 'ExternalLink') {
            this.pageReference = {
                type: 'standard__webPage',
                attributes: {
                    url: target
                }
            };
        }
        if (this.pageReference) {
            this[NavigationMixin.GenerateUrl](this.pageReference)
            .then(url => {
                this.href = url;
            });
        }
    } 

    handleClick() {
        const hideNavbar = new CustomEvent('hidenavbar');
        this.dispatchEvent(hideNavbar);
        if(this.pageReference) {
            this[NavigationMixin.Navigate](this.pageReference);
        }
    }
}