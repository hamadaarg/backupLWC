import { LightningElement, api, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class BoatTileLwc extends LightningElement {
    @api boat = '';
    @api selected = '';
    @wire(CurrentPageReference) pageRef;
    handleOnClick() {
        const selectEvent = new CustomEvent('boatselect', {
            detail: this.boat.Id,
        });
        this.dispatchEvent(selectEvent);

        fireEvent(this.pageRef, 'boatselect', this.boat.Id);
    }

    get backgroundImage() {
        return `background-image: url(${this.boat.Picture__c})`;
    }

    get tileClass() {
        if (this.selected === this.boat.Id) {
            return `tile selected`;
        }
        else {
            return `tile`;
        }
    }
}