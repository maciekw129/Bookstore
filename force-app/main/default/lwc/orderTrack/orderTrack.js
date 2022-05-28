import { LightningElement, api } from 'lwc';

export default class OrderTrack extends LightningElement {
    @api status;

    get newStyle() {
        return `track__dot ${this.status === "Canceled ? track__dot--red : track__dot--realized"}`;
    }

    get inProgressStyle() {
        if(this.status === 'Canceled') {
            return 'track__dot track__dot--red'
        } else if(this.status === 'Realized') {
            return 'track__dot track__dot--realized'
        } else {
            return 'track__dot'
        }
    }

    get realizedStyle() {
        if(this.status === 'Canceled') {
            return 'track__dot track__dot--red'
        } else if(this.status === 'Realized') {
            return 'track__dot track__dot--realized'
        } else {
            return 'track__dot'
        }
    }

    get lineStyle() {
        if (this.status === 'In progress') {
            return 'track__line track__half-realized';
        } else if (this.status === 'Realized') {
            return 'track__line track__dot--realized'
        } else if (this.status === 'Canceled') {
            return 'track__line track__line--red'; 
        } else {
            return 'track__line';
        }
    }

}