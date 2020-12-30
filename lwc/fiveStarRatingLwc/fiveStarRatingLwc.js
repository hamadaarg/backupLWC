import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import fiveStar from '@salesforce/resourceUrl/fivestar';

export default class FiveStarRatingLwc extends LightningElement {
    @api rating = '';
    @api showonly = false;
    fiveStarInitialized = false;

    renderedCallback() {
        if (this.fiveStarInitialized) {
            return;
        }

        Promise.all([
            loadScript(this, fiveStar + '/rating.js'),
            loadStyle(this, fiveStar + '/rating.css'),
        ])
            .then(() => {
                this.initializeFiveStar();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading fiveStar',
                        message: error.message,
                        variant: 'error'
                    })
                );
                console.log(error);
            });
    }

    initializeFiveStar() {
        const ul = this.template.querySelector('ul.c-rating');
        const maxRating = 5;
        const callback = function (rating, thisvar) {
            console.log(rating);
            thisvar.dispatchEvent(
                new CustomEvent('ratingchange', {
                    detail: rating,
                }),
            );
        }
        const fs = rating(ul, this.rating, maxRating, callback, this.showonly, this);
    }

    get styleClass() {
        if (this.showonly) {
            return 'showonly c-rating';
        }
        else {
            return 'c-rating';
        }
    }
}

// renderedCallback, connectedCallback difference
// promise.all