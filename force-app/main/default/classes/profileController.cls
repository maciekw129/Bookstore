public without sharing class profileController {
    @AuraEnabled(cacheable=true)
    public static List<Order__c> getAllOrders() {
        String userId = UserInfo.getUserId();
        return [SELECT Name, Order_date__c, Order_status__c, (SELECT Id, Quantity__c, Book__r.Title__c, Book__r.ISBN__c, Book__r.Author__c FROM Order_Items__r) FROM Order__c WHERE CreatedById =: userId ORDER BY Order_date__c DESC];
    }

    @AuraEnabled
    public static List<Contact> getUserDetails(){
        Id contactId = Utilities.getLoggedContactId();
        return [SELECT Id, FirstName, LastName, Phone, City__c, Postal_code__c, Street__c, Apartment__c FROM Contact WHERE Id=: ContactId];
    }

    @AuraEnabled
    public static List<Contact> getSpecificUserDetails(Id userId){
        return [SELECT Id, FirstName, LastName FROM Contact WHERE Id=: userId];
    }

    @AuraEnabled
    public static void updateUserDetails(String FirstName, String LastName, String Phone, String City, String PostalCode, String Street, String Apartment){

        Id contactId = Utilities.getLoggedContactId();

        Contact userContact = new Contact(
            Id = contactId,
            FirstName = FirstName,
            LastName = LastName,
            Phone = Phone,
            City__c = City,
            Postal_code__c = PostalCode,
            Street__c = Street,
            Apartment__c = Apartment
        );

        update userContact;
    }
    
    @AuraEnabled
    public static Contact getShippingAddress(){
        Id contactId = Utilities.getLoggedContactId();
        return [SELECT City__c, Postal_code__c, Street__c, Apartment__c, Phone FROM Contact WHERE Id=:contactId];
    }

    @AuraEnabled
    public static void register(String email, String firstName, String lastName, String password){
        User user = new User();
        user.Email = email;
        user.FirstName = firstName;
        user.LastName = lastName;
        user.Username = email;
        user.CommunityNickName = user.Username;

    Id userId = Site.createExternalUser(user, null, password);
    }

    @AuraEnabled
    public static String login(String email, String password){
        return Site.login(email, password, '/').getUrl();
}
}
