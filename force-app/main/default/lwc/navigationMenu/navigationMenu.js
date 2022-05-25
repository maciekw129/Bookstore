import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';
import isGuestUser from '@salesforce/user/isGuest';
import basePath from '@salesforce/community/basePath';

export default class NavigationMenu extends NavigationMixin(LightningElement) {
    @track menuItems;
    @track isLoaded = false;
    @track error;
    publishedState;
    isMenuNavVisible = false;

    @wire(getNavigationMenuItems, {
        menuName: isGuestUser ? 'Default Navigation' : 'User Navigation',
        publishedState: '$publishedState'
    })
    wiredMenuItems({error, data}) {
        if (data && !this.isLoaded) {
            this.menuItems = data.map((item, index) => {
                return {
                    target: item.Target,
                    id: index,
                    label: item.Label,
                    defaultListViewId: item.DefaultListViewId,
                    type: item.Type,
                    accessRestriction: item.AccessRestriction
                }
            }).filter(item => {
                return item.accessRestriction === 'None' || (item.accessRestriction === "LoginRequired" && !isGuestUser);
            });
            this.error = undefined;
            this.isLoaded = true;
        } else if (error) {
            this.error = error;
            this.menuItems = [];
            this.isLoaded = true;
            console.log(error);
        }
    }

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        const app = currentPageReference && currentPageReference.state && currentPageReference.state.app;
        if (app === 'commeditor') {
            this.publishedState = 'Draft';
        } else {
            this.publishedState = 'Live';
        }
    }

    get isGuest() {
        return isGuestUser;
    }

    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, "");
        return sitePrefix + "/secur/logout.jsp";
    }

    toggleIsMenuNavVisible() {
        const navigation = this.template.querySelector('[data-target-id="mobile-nav"');
        this.isMenuNavVisible ? navigation.style.transform = 'translateX(0%)' : navigation.style.transform = 'translateX(100%)';
        this.isMenuNavVisible = !this.isMenuNavVisible;
    }

    handleHomeNavigation() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        })
    }
}