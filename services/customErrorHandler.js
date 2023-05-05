class customErrorHandler extends Error{
    constructor(status,msg){
        super();
        this.status = status;
        this.msg = msg;
    }
    
    static alreadyExists(message){
        return new customErrorHandler(409,message);
    }
}


export default customErrorHandler;