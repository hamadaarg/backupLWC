public class BoatSearchResults {
    
    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId){
        if(boatTypeId != '' && boatTypeId != 'allTypesValue'){
            return [SELECT Id, Name, Geolocation__Latitude__s, Geolocation__Longitude__s, BoatType__c, BoatType__r.Name, Description__c, Price__c, Length__c, Picture__c, Contact__r.Name
                    FROM Boat__c
                    WHERE BoatType__c =: boatTypeId];
        } else{
            return [SELECT Id, Name, Geolocation__Latitude__s, Geolocation__Longitude__s, BoatType__c, BoatType__r.Name, Description__c, Price__c, Length__c, Picture__c, Contact__r.Name
                    FROM Boat__c];
        }
    }
}