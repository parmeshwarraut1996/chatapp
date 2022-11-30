exports.addUser=(request,response)=>{
    request.checkBody("firstName","First name can not be empty").notEmpty();

}