import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatDetail extends NavigationMixin(LightningElement) {
    @api boat;

    get backgroundImage() {
        return `background-image: url(${this.boat.fields.Picture__c.value})`;
    }

    get title() {
        return `${this.boat.fields.Contact__r.displayValue}'s Boat`;
    }

    handleFullDetails() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.boat.id,
                actionName: 'view',
            },
        });
    }
}