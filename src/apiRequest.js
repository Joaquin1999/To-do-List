const apiRequest=async(url='',optionObj=null,errMsg=null)=>{

try{
    const response=await fetch(url,optionObj)

    if(!response.ok)throw Error("Please ReLoad the page");
}
catch(err){
    errMsg=err.Message;
}
finally{
    return errMsg;
}

}
export default apiRequest;