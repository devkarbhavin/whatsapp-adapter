/**
 * Create new session details
 * key is profileId
 * value is array of sessionId and timestamp of last message
 */
exports.mapSessionIdCreate = function(channelId,whatsappNumber){
    // let sessionId = generateSessionId();
    // let timestamp = new Date().getTime();
    mapFlexSessionId.set(channelId, []); //create empty array for each profileId
    mapFlexSessionId.get(channelId).push(whatsappNumber); //add sessionId as first parameter in empty array
    //mapFlexSessionId.get(profileId).push(timestamp); //add timestamp as second parameter in empty array
    //logger.log('info', 'exports.mapSessionIdCreate()>New sessionId= ' + sessionId + ' created. New map size is= ' + mapSessionId.size, {logId: sessionId});  
    return channelId;     
}

let mapFlexSessionId = new Map();

/**
 * Get session details for the profileId
 */
exports.mapSessionIdGet =  function(profileId){     
    return mapFlexSessionId.get(profileId);        
}

exports.mapChannelSidGet =  function(profileId){  
    for (var entry of mapFlexSessionId.entries()) {
        var key = entry[0],
            value = entry[1];
        console.log(key + " = " + value);
        if(value==profileId){
            console.log('mapChannelSidGet() channelid = '+key)
            return key;
        }
    } 
    return 'false';        
}

/**
 * Delete session details from map
 */
exports.mapSessionIdDelete = function(profileId){
    console.log('mapSessionIdDelete')
    let result = "Error"
    // let sessionId= null;
    try{
        // let sessionId= exports.mapSessionIdGet(profileId)[0];

        if(mapFlexSessionId.has(profileId)){
            mapFlexSessionId.delete(profileId);
            result = "Success";
        }else{
            result = "profileId not found";    
        }        
    }catch(e){
        // logger.log('error', e.stack, {logId: sessionId});
    }  
    //logger.log('info', "mapSessionIdDelete()> result= "+ result + " new map size is= " + mapSessionId.size, {logId: sessionId});
    console.log('mapSessionIdDelete()> result= '+result)
    return result;  
}