import { LightningElement, wire, track } from 'lwc';
import {registerListener, unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';
const fields = [
    'Boat__c.Name',
    'Boat__c.BoatType__r.Name',
    'Boat__c.Length__c',
    'Boat__c.Contact__r.Name',
    'Boat__c.Price__c',
    'Boat__c.Description__c',
    'Boat__c.Picture__c'
];
export default class BoatDetailsLwc extends LightningElement {
    boatId;
    @track boat = '';
    @wire(CurrentPageReference) pageRef;

    @wire(getRecord, {recordId : '$boatId', fields})
    loadRecord({data, error}) {
        if (data) {
            this.boat = data;
        }
        else if (error) {
            console.log(error);
        }
    }

    connectedCallback() {
        registerListener('boatselect', this.handleBoatSelect, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleBoatSelect(boatId) {
        this.boatId = boatId;
    }

    handleReviewAdded() {
        this.template.querySelector('c-boat-reviews-lwc').refreshReviews();
    }
}

//why properties in export written without specificator? boatId
// $ in wire makes variable reactive, regardless of is it decorator or not