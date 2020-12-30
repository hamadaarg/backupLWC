import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/BoatReview__c.Name';
import COMMENT_FIELD from '@salesforce/schema/BoatReview__c.Comment__c';
import RATING_FIELD from '@salesforce/schema/BoatReview__c.Rating__c';
import BOATREVIEW_OBJECT from '@salesforce/schema/BoatReview__c';
import BOAT_FIELD from '@salesforce/schema/BoatReview__c.Boat__c';

export default class AddBoatReviewLwc extends LightningElement {
    @api boat;
    review = '';
    title = '';
    rating = '';
    comment = '';

    handleTitleChange(event) {
        this.title = event.target.value;
    }

    handleCommentChange(event) {
        this.comment = event.target.value;
    }

    handleRatingChange(event) {
        this.rating = event.detail;
    }

    handleOnSubmit() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.title;
        fields[COMMENT_FIELD.fieldApiName] = this.comment;
        fields[BOAT_FIELD.fieldApiName] = this.boat.id;
        fields[RATING_FIELD.fieldApiName] = this.rating;
        const recordInput = { apiName: BOATREVIEW_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Review created!',
                        variant: 'success',
                    }),
                );
                this.dispatchEvent(
                    new CustomEvent('reviewadded')
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToasEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}