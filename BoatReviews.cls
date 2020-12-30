public with sharing class BoatReviews{

    @AuraEnabled
    public static List<BoatReview__c>  getAll (String boatTypeId) {
        return [SELECT Id, Name, Comment__c, Rating__c, CreatedBy.Id, CreatedBy.Name, CreatedBy.SmallPhotoUrl, CreatedBy.CompanyName, LastModifiedDate, CreatedDate
				FROM BoatReview__c
                WHERE Boat__c =: boatTypeId];
    }
}