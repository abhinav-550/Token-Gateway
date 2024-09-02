function createSession(id , req, res, statusCode , message){
    req.session.userId = id;    
    if(req.session.userId){
        res.status(statusCode).json({
            success : true,
            message ,
        })
    }else{
        res.status(500).json({
            success : false
        })
    }
}

export default  createSession;