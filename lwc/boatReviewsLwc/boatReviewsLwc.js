import { LightningElement, track, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAll from '@salesforce/apex/BoatReviews.getAll';

export default class BoatReviewsLwc extends LightningElement {
    @api boatId;
    @track boatReviews = '';
    wiredData = '';

    @wire(getAll, { boatId: '$boatId' })
    loadReviews(result) {
        this.wiredData = result;
        if (result.data) {
            let reviews = [];
            result.data.forEach(element => {
                const review = {...element, avatarName: element.CreatedBy.Name + '\'s Avatar'};
                reviews.push(review);
            });
            this.boatReviews = reviews;
        }
        else if(result.error) {
            this.boatReviews = undefined;
            console.log(result.error);
        }
    }

    @api
    refreshReviews() {
        refreshApex(this.wiredData);
    }

    get hasReviews() {
        return this.boatReviews.length > 0;
    }
}