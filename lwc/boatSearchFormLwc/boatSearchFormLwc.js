import { LightningElement, track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import BOAT_TYPE_OBJECT from '@salesforce/schema/BoatType__c';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatSearchFormLwc extends NavigationMixin(LightningElement) {
    @track boatTypes = [];
    @wire(getListUi, { objectApiName: BOAT_TYPE_OBJECT, listViewApiName: 'All' })
    loadBoatTypes({ error, data }) {
        if (data) {
            data.records.records.forEach(element => {
                var type = {
                    label: element.fields.Name.value,
                    value: element.fields.Id.value,
                }
                this.boatTypes.push(type);
            });
        }
        else if (error) {
            console.log(error);
        }
    }

    handleOnChange(event) {
        const customEvent = new CustomEvent('typeselect', {
            detail: event.target.value,
        });
        this.dispatchEvent(customEvent);
    }

    addBoat() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new'
            }
        });
    }

}