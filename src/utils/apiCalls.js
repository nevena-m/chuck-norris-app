function isOfTypeRequired(aFunc, expectedType){
    return aFunc !== undefined && typeof aFunc === expectedType; 
}

function isOfTypeOptional(aFunc, expectedType){
    return aFunc === undefined || typeof aFunc === expectedType;
}

export default function doApiCall({
    /** string */
    url,
    /** ()=>void*/
    onFinally,
    /** (data)=>void */
    onOk, 
    /** (errorMsg)=>void */
    onError,
    /** "json"|"text"|"blob" */
    type 
}){
    if(!isOfTypeRequired(onOk, "function")){
        throw Error("onOk callback not provided");
    }
    if(!isOfTypeRequired(url, "string")){
        throw Error("url not provided, or is of incorrect type");
    }
    if(!isOfTypeOptional(onFinally, "function")){
        throw Error("onFinally should be a function");
    }
    if(!isOfTypeOptional(onError, "function")){
        throw Error("onError should be a function");
    }

    fetch(url).then(response=>{
        let aType = type;
        if(response.ok){
            let data = undefined;
            if(type === undefined){
               aType = "text"; 
            }
            if(aType==="text"){
                data = response.text();
            }
            else if(aType==="json"){
                data = response.json();
            }
            else if(aType==="blob"){
                data = response.blob();
            }
            data.then(d=>onOk(d)).catch(err=>onError && onError(err.message));
        }
        else {
            let msg = undefined;
            if(response.status >= 500){
                msg = "There is something wrong with the server. Try again later or contact the support.";
            }
            else if(response.status >= 400){
                msg = "There is something wrong with Your request. Check it and try again.";
            }
            else{
                msg = response.statusText;
            }
            response.text().then(t=>{
                let temp = msg
                try{
                    let json = JSON.parse(t);
                    if(json.message){
                        temp = json.message;
                    }
                }catch(err){}
                onError && onError(temp)
            })
            .catch(err=> onError && onError(msg))
        }
    }).catch(err=>onError && onError(err.message)).finally(()=>onFinally && onFinally());
}