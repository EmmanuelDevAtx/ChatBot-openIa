

export const responseIASelect=(responseDataIA: string)=>{
    const id : number = responseDataIA.indexOf('!');
    if(responseDataIA[id+1] === '['){
        const messageResponse = cutMessageNew(responseDataIA, id);
        const idData : number = messageResponse.indexOf('(');
        if(messageResponse[idData+1] === 'h' && messageResponse[idData+2] === 't' && messageResponse[idData+3] === 't'){
            const idDataEnd: number= messageResponse.indexOf(')');
            const {message, urlImg}=getUrlImage(responseDataIA,messageResponse, id, idData, idDataEnd);
            return {message, urlImg};
        }
        return {message : responseDataIA, urlImg: 'none'};
    }

    return {message : responseDataIA, urlImg: 'none'};


}

const cutMessageNew=(data: string, idexStart: number)=>{
    let cutMessage = '';
    
    for(var i = idexStart; i<data.length; i++){
        cutMessage =cutMessage+ data[i];
    }
    // console.log("el uri de la imegan es: " + cutMessage);
    return cutMessage;
}
const getUrlImage=(data: string, cutMessage: string, messageIdex: number ,startIndex: number, endIndex: number)=>{
    let urlImg = '';
    let message = '';
    for(var i = startIndex+1; i<endIndex; i++){
        urlImg = urlImg+ cutMessage[i];
    }
    for(var i = 0; i<messageIdex; i++){
        message =message+ data[i];
    }
    // console.log("el uri de la imegan es: " + urlImg);
    return{message, urlImg};
}
