public without sharing class Utilities {

    @AuraEnabled(cacheable=true)
    public static Id getLoggedContactId() {
        String userId = UserInfo.getUserId();
        User con = [SELECT ContactId FROM User WHERE Id =: userId LIMIT 1];
        return con.ContactId;
    }
    
}