const validate = (input, value) => {
    if(input === 'email') {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value);
    } else if(input === 'Postal_code__c') {
        return (/\d{2}-\d{3}/).test(value);
    } else if(input === 'Phone') {
        return (/^(\+48)?-?\s?\d{3}-?\s?\d{3}-?\s?\d{3}$/).test(value);
    } else if(input === 'FirstName' || input === 'LastName' || input === 'City__c' || input === 'Street__c' || input === 'Apartment__c') {
        return value.length > 0;
    } else {
        return true
    }
}

export default validate;