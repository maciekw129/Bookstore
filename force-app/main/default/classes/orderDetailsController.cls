public with sharing class orderDetailsController {

    @AuraEnabled(cacheable=true)
    public static List<Order_Item__c> getOrderedItems(String orderId) {
        return [SELECT quantity__c, book__r.Id, book__r.Name, book__r.Title__c, book__r.Author__c, book__r.ISBN__c FROM Order_Item__c WHERE Order__c =:orderId];
    }

    @AuraEnabled(cacheable=true)
    public static void setOrderStatus(String status, String orderId) {
        Order__c order = [SELECT order_status__c FROM Order__c WHERE Id =: orderId];

        order.order_status__c = status;
        update order;
    }
}