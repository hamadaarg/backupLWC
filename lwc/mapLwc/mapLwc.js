import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class MapLwc extends LightningElement {
    @track mapMarkers = '';

    @wire(CurrentPageReference)
    wiredPageRef(pageRef) {
        this.pageRef = pageRef;
        if (this.pageRef) {
            registerListener('plotmarker', this.handlePlotMarker, this);
        }
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handlePlotMarker(coords) {
        this.mapMarkers = [
            {
                location: {
                    Latitude: coords.lat,
                    Longitude: coords.long,
                }
            }
        ];
    }
}