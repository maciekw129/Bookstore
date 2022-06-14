trigger sendEmailOnCreatingOrder on Order__c (after insert) {
	
    Id contactId = Utilities.getLoggedContactId();
    
    Contact loggedContact = [SELECT FirstName, LastName, Email FROM Contact WHERE Id =: contactId LIMIT 1];
    Order__c order = [SELECT Name, Id FROM Order__c WHERE Id =: Trigger.New];
    List<Cart_item__c> cartItems = [SELECT Book__r.title__c, Book__r.author__c, quantity__c FROM Cart_item__c WHERE Contact__c =: contactId];
    
    List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
    String books = '';
    
    for(Cart_item__c cartItem : cartItems) {
        books = books + ' - ' + cartItem.quantity__c + 'x ' + cartItem.Book__r.Author__c + ' ' + cartItem.Book__r.title__c +'<br/>';
    }
    
    System.Debug(books);
    
    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    mail.setSubject('Order ' + order.Name);
    List<String> toAddress = new List<String>();
    toAddress.add(loggedContact.Email);
    mail.setToAddresses(toAddress);
    
    String emailBody = 'Hello ' + loggedContact.FirstName + '! <br/><br/>' + 'Thank You for shopping at the Bookstore. <br/> Your order:<br/>' + books + '<br/><br/>Enjoy reading, <br/> Bookstore Team';
    mail.setHtmlBody(emailBody);
    
    emailList.add(mail);
    
    Messaging.sendEmail(emailList);
}