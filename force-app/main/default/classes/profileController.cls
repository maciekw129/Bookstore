public without sharing class profileController {
    @AuraEnabled(cacheable=true)
    public static List<Order__c> getAllOrders() {
        
        String userId = UserInfo.getUserId();

        return [SELECT Name, Order_date__c, Order_status__c, (SELECT Id, Quantity__c, Book__r.Title__c, Book__r.ISBN__c, Book__r.Author__c FROM Order_Items__r) FROM Order__c WHERE CreatedById =: userId];

    }
}
