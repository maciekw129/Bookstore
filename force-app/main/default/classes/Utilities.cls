public without sharing class Utilities {

    @AuraEnabled(cacheable=true)
    public static Id getLoggedContactId() {
        String userId = UserInfo.getUserId();
        User con = [SELECT ContactId FROM User WHERE Id =: userId LIMIT 1];
        return con.ContactId;
    }

    @AuraEnabled
    public static String sendContactEmail(String email, String text) {
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setSubject('Bookstore question');

        List<String> toAddress = new List<String>();
    
        mail.toAddresses = new String[]{'maciej.walecki@ace-agency.co'};

        String emailBody = 'Hi there! <br/><br/> You got a question from Bookstore "Contact Us". The content of the question:<br/><br/>' + text + '<br/><br/>Send response here: ' + email;

        mail.setHtmlBody(emailBody);

        List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
        emailList.add(mail);
        Messaging.SendEmailResult[] results = Messaging.sendEmail(emailList);

        if (results[0].success) {
            return 'success';
        } else {
            return 'failed';
        }
    }
    
}