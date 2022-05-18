import { LightningElement, api } from 'lwc';

export default class OrderTrack extends LightningElement {
    @api status;

    get newStyle() {
        return this.status === "Canceled" ? 'dot red_dot' : 'dot realized_dot';
    }

    get inProgressStyle() {
        if(this.status === 'Canceled') {
            return 'dot red_dot'
        } else {
            return this.status === 'New' ? 'dot' : 'realized_dot dot';
        }
    }

    get realizedStyle() {
        if(this.status === 'Canceled') {
            return 'dot red_dot'
        } else {
            return this.status === 'Realized' ? 'realized_dot dot' : 'dot';
        }
    }

    get lineStyle() {
        if (this.status === 'In progress') {
            return 'line half_realized_track';
        } else if (this.status === 'Realized') {
            return 'line realized_track'
        } else if (this.status === 'Canceled') {
            return 'line red_line'; 
        } else {
            return 'line';
        }
    }

}