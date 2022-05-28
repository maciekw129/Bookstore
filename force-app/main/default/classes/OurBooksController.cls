public without sharing class OurBooksController {

    @AuraEnabled(cacheable=true)
    public static List<Book__c> getAllBooks() {
        return [SELECT cover__c, title__c, author__c, genres__c, ISBN__c, Prize__c, on_stock__c FROM Book__c];
    }

    @AuraEnabled(cacheable=true)
    public static Book__c getSpecificBook(Id bookId) {
        return [SELECT cover__c, description__c, availability__c, Prize__c, title__c, author__c, genres__c, on_stock__c, ISBN__c FROM Book__c WHERE Id=: bookId LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<List<SObject>> searchBooks(String searchTerm) {
        return [FIND :searchTerm IN ALL FIELDS RETURNING Book__c(Title__c, Cover__c, Author__c, Id)];
    }

    @AuraEnabled(cacheable=true)
    public static List<book__c> getBestSellers() {
        return [SELECT cover__c, title__c, author__c, genres__c, Prize__c, ISBN__c, Number_of_copies_sold__c FROM Book__c ORDER BY Number_of_copies_sold__c DESC LIMIT 6];
    }

    @AuraEnabled
    public static List<book__c> getBooksOneGenre(String genre){
        return [SELECT cover__c, title__c, author__c, genres__c, Prize__c, ISBN__c, Number_of_copies_sold__c FROM Book__c WHERE Genres__c includes (:genre) LIMIT 6];
    }

    @AuraEnabled(cacheable=true)
    public static List<book__c> getNewest() {
        return [SELECT cover__c, title__c, author__c, Prize__c, genres__c, ISBN__c, Number_of_copies_sold__c FROM Book__c ORDER BY createdDate DESC LIMIT 6];
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getAllGenres() {
        List<String> genres = new List<String>();

        Schema.DescribeFieldResult fieldResult = Book__c.Genres__c.getDescribe();
        List<Schema.PicklistEntry> pickListValues = fieldResult.getPicklistValues();

        for(Schema.PicklistEntry pickListValue : pickListValues) {
            genres.add(pickListValue.getLabel());
        }

        return genres;
    }

    @AuraEnabled
    public static List<Order_item__c> getMostPopularCategories(){
        return [SELECT book__r.genres__c FROM Order_item__c];
    }

    @AuraEnabled
    public static List<book__c> getSimilarBooks(Id bookId){
        book__c book = [SELECT genres__c, Author__c FROM book__c WHERE Id=: bookId];
        List<book__c> theSameAuthor = [SELECT cover__c, title__c, author__c, genres__c, ISBN__c, Number_of_copies_sold__c, Prize__c FROM book__c WHERE Author__c =: book.Author__c AND Id !=: bookId LIMIT 3];
        
        String genre = book.Genres__c.split(';')[0];
        Integer numberOfRestBooks = 6 - theSameAuthor.size();
        List<book__c> theSameGenre = [SELECT cover__c, title__c, author__c, genres__c, ISBN__c, Number_of_copies_sold__c, Prize__c FROM book__c WHERE Genres__c includes (:genre) AND Author__c !=: book.Author__c LIMIT :numberOfRestBooks];
        
        List<book__c> combinedList = new List<Book__c>();
        combinedList.addAll(theSameAuthor);
        combinedList.addAll(theSameGenre);
        return combinedList;
    }

    @AuraEnabled
    public static void createComment(Id bookId, String text, Integer rate){
        Id userId = Utilities.getLoggedContactId();
        Comment__c newComment = new Comment__c(
            Book__c = bookId,
            Contact__c = userId,
            Rate__c = rate,
            Text__c = text
        );

        insert newComment;
    }

    @AuraEnabled
    public static List<comment__c> getBookComments(Id bookId){
        return [SELECT text__c, contact__c, rate__c FROM Comment__c WHERE book__c =: bookId];
    }

    @AuraEnabled
    public static Decimal getBookRate(Id bookId){
        List<comment__c> comments = [SELECT rate__c FROM Comment__c WHERE book__c =: bookId];
        Decimal sumRate;
        for(comment__c comment : comments) {
            sumRate += comment.rate__c;
        }
        return sumRate / comments.size();
    }
}