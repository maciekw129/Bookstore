public without sharing class CartController {
    
    @AuraEnabled
    public static void AddItemToCart(Id bookToAdd, Integer quantity){
        Id userId = Utilities.getLoggedContactId();
        
        book__c book = [SELECT on_stock__c FROM book__c WHERE Id =: bookToAdd LIMIT 1];
        if(quantity > book.on_stock__c) {
            return;
        } 
        
        List<Cart_item__c> CartItems = [SELECT quantity__c, book__c, book__r.on_stock__c FROM Cart_item__c WHERE Contact__c =: userId];
        
        for(Cart_item__c cartItem : CartItems){
            if(cartItem.Book__c == bookToAdd){
                if(cartItem.book__r.on_stock__c < cartItem.quantity__c) {
                    return;
                }
                cartItem.quantity__c += quantity;
                return;
            }
        }

        update CartItems;
            
        Cart_item__c NewCartItem = new Cart_item__c(
        	Contact__c = userId,
            Book__c = bookToAdd,
            Quantity__c = quantity
        );
        
        insert NewCartItem;
	}
    
    @AuraEnabled
    public static void DeleteAllItemsFromCart() {
        Id userId = Utilities.getLoggedContactId();
        delete [SELECT Id FROM Cart_Item__c WHERE Contact__c =: UserId];
    }
    
    @AuraEnabled
    public static List<Cart_item__c> GetCartItems() {
        Id userId = Utilities.getLoggedContactId();
        return [SELECT Book__r.Author__c, Book__r.Title__c, Book__r.Prize__c, Prize_sum__c, Quantity__c FROM Cart_Item__c WHERE Contact__c =: UserId];
    }
    
    @AuraEnabled
    public static void SubstractQuantity(Id cartItemId) {
        Cart_Item__c item = [SELECT Id, Quantity__c FROM Cart_item__c WHERE Id =: cartItemId];
        
        if(item.Quantity__c <= 1) {
            delete item;
        } else {
            item.Quantity__c -= 1;
            update item;
        }
    }
    
    @AuraEnabled
    public static void AddQuantity(Id cartItemId) {
        Cart_Item__c item = [SELECT Id, Quantity__c FROM Cart_item__c WHERE Id =: cartItemId];
        
         item.Quantity__c += 1;
         update item;
     
    }
    
    @AuraEnabled
    public static void CreateOrder(String city, String postalCode, String street, String apartment, String phone) {
        Id userId = Utilities.getLoggedContactId();
        
        List<Cart_item__c> cartItems = [SELECT Id, Book__c, Quantity__c, Prize_sum__c FROM Cart_item__c WHERE Contact__c =: userId];
        
        List<Order_item__c> orderItems = new List<Order_item__c>();
        Decimal totalCost = 0;

        Order__c order = new Order__c(
        	Order_status__c= 'New',
            Order_date__c= DateTime.now(),
            City__c= city,
            Postal_code__c= postalCode,
            Street__c= street,
            Apartment__c= apartment,
            Phone__c= phone,
            Total_cost__c= totalCost
        );
        insert order;
        
        for(Cart_item__c item : cartItems) {
            totalCost += item.Prize_sum__c;
            Order_item__c orderItem = new Order_Item__c(
            	Book__c = item.Book__c,
                Quantity__c = item.Quantity__c,
                Order__c = order.Id,
                Cost__c = item.Prize_sum__c
            );
            orderItems.add(orderItem);
        }

        order.Total_cost__c = totalCost;
        update order;
        
        
        insert orderItems;
        delete cartItems;
    }
}