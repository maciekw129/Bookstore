public with sharing class OurBooksController {

    @AuraEnabled(cacheable=true)
    public static List<Book__c> getAllBooks() {
        return [SELECT cover__c, title__c, author__c, genres__c, ISBN__c FROM Book__c];
    }

    @AuraEnabled(cacheable=true)
    public static Book__c getSpecificBook(Id bookId) {
        return [SELECT cover__c, description__c, availability__c, title__c, author__c, genres__c, on_stock__c, ISBN__c FROM Book__c WHERE Id=: bookId LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<List<SObject>> searchBooks(String searchTerm) {
        return [FIND :searchTerm IN ALL FIELDS RETURNING Book__c(Title__c, Cover__c, Author__c, Id)];
    }

    @AuraEnabled(cacheable=true)
    public static List<book__c> getBestSellers() {
        return [SELECT cover__c, title__c, author__c, genres__c, ISBN__c, Number_of_copies_sold__c FROM Book__c ORDER BY Number_of_copies_sold__c DESC LIMIT 5];
    }
}