class customErrorHandler extends Error{
    constructor(status,msg){
        super();
        this.status = status;
        this.msg = msg;
    }
    
    static alreadyExists(message){
        return new customErrorHandler(409,message);
    }

    static notFound(message){
        return new customErrorHandler(404,message);
    }

    static wrongCredentials(message="Email or Password is wrong"){
        return new customErrorHandler(401,message);
    }

}


export default customErrorHandler;