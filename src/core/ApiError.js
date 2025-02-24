
//Class object to throw error and extends Error to tell js engine to treat them as actual errors
//and default message this set if there isn;t any message sent then default error messages will appear
class BadRequestError extends Error{
    constructor(message = "Bad Request"){
        super(message);
        this.status = 400;
    }
};

class InternalServerError extends Error{
    constructor(message = "Internal Server Request"){
        super(message);
        this.status = 500;
    }
};

class AuthenticationError extends Error{
    constructor(message = "Authentication Failed"){
        super(message);
        this.status = 401;
    }
};


module.exports = {
    BadRequestError, InternalServerError, AuthenticationError
}