import { LightningElement, api, wire, track } from 'lwc';
import getBoats from '@salesforce/apex/BoatSearchResults.getBoats';


export default class BoatSearchResultsLwc extends LightningElement {
    @track selectedId = '';
    @api boatTypeId;
    @track boats = '';
    @wire(getBoats, {boatTypeId: '$boatTypeId'})
    loadBoats({data, error}) {
        if (data) {
            if (data.length > 0) {
                this.boats = data;
            }
            else {
                this.boats = '';
            }
        }
        else if (error) {
            console.log(error);
        }
    }

    handleOnBoatSelect(event) {
        this.selectedId = event.detail;

        /*this.boats.forEach((element, index) => {
            if (event.detail === element.Id) {
                console.log('here');
                //console.log(element);
                //element.Name = 'Test';
                //this.element.Name = 'Selected';
                //this.boats[index].selected = true;
                //element.selected = event.detail;
                //console.log(element);
                //console.log('selected ' + element.selected);
            }
            else {
               // element.selected = false;
            }
        })

        /*can't mutate data returned by apex. the idea is to put selected=true property to
        the boat, which was selected in order to change border color. Facing error without
        any useful information
        perhaps this is an answer: "The wire service provisions an immutable stream of data to the component.
         Each value in the stream is a newer version of the value that precedes it." from documentation.
        **********
        this is tricky in lwc. you need almost always specify it
        console.log(selectedId) - will cause an error
        while console.log(this.selectedId) will not
        */
    }
}