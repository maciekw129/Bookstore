public with sharing class customersController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getCustomers() {
        return [SELECT Id, Email, firstName, lastName FROM Contact WHERE AccountId = '0017Q00000DqP5xQAF'];
    }
}