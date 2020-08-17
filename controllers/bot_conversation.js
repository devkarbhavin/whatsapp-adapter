/**
 * Create new session details
 * key is profileId
 * value is array of sessionId and timestamp of last message
 */
exports.mapbotSessionCreate = function(whatsappNumber,message){
    // let sessionId = generateSessionId();
    // let timestamp = new Date().getTime();
    var mapExists=mapbotConversationGet(whatsappNumber)
    if(mapExists==undefined){
        mapbotConversation.set(whatsappNumber, []); //create empty array for each profileId
    }
    mapbotConversation.get(whatsappNumber).push(message); //add sessionId as first parameter in empty array
    //mapFlexSessionId.get(profileId).push(timestamp); //add timestamp as second parameter in empty array
    //logger.log('info', 'exports.mapSessionIdCreate()>New sessionId= ' + sessionId + ' created. New map size is= ' + mapSessionId.size, {logId: sessionId});  
    return whatsappNumber;     
}

exports.mapbotSessionAddMessage = function(whatsappNumber,message){
    // let sessionId = generateSessionId();
    // let timestamp = new Date().getTime();
    //mapbotConversation.set(whatsappNumber, []); //create empty array for each profileId
    mapbotConversation.get(whatsappNumber).push(message); //add sessionId as first parameter in empty array
    //mapFlexSessionId.get(profileId).push(timestamp); //add timestamp as second parameter in empty array
    //logger.log('info', 'exports.mapSessionIdCreate()>New sessionId= ' + sessionId + ' created. New map size is= ' + mapSessionId.size, {logId: sessionId});  
    return whatsappNumber;     
}

exports.mapIsAgentAssignedCreate = function(whatsappNumber){
    // let sessionId = generateSessionId();
    // let timestamp = new Date().getTime();
    var mapExists=mapIsAgentAssignedGet(whatsappNumber)
    if(mapExists==undefined){
        mapIsAgentAssigned.set(whatsappNumber, []); //create empty array for each profileId
        mapIsAgentAssigned.get(whatsappNumber).push('Yes'); //add sessionId as first parameter in empty array
    }
    //mapFlexSessionId.get(profileId).push(timestamp); //add timestamp as second parameter in empty array
    //logger.log('info', 'exports.mapSessionIdCreate()>New sessionId= ' + sessionId + ' created. New map size is= ' + mapSessionId.size, {logId: sessionId});  
    return whatsappNumber;     
}

let mapbotConversation = new Map();
let mapIsAgentAssigned=new Map();

/**
 * Get session details for the profileId
 */
function mapbotConversationGet(whatsappNumber){     
    return mapbotConversation.get(whatsappNumber);        
}

/**
 * Delete session details from map
 */
exports.mapbotConversationDelete = function(whatsappNumber){
    console.log('mapSessionIdDelete')
    let result = "Error"
    // let sessionId= null;
    try{
        // let sessionId= exports.mapSessionIdGet(profileId)[0];

        if(mapbotConversation.has(whatsappNumber)){
            mapbotConversation.delete(whatsappNumber);
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

function mapIsAgentAssignedGet(whatsappNumber){     
    return mapIsAgentAssigned.get(whatsappNumber);        
}

/**
 * Delete session details from map
 */
exports.mapIsAgentAssignedDelete = function(whatsappNumber){
    console.log('mapmapIsAgentAssignedDelete')
    let result = "Error"
    // let sessionId= null;
    try{
        // let sessionId= exports.mapSessionIdGet(profileId)[0];

        if(mapIsAgentAssigned.has(whatsappNumber)){
            mapIsAgentAssigned.delete(whatsappNumber);
            result = "Success";
        }else{
            result = "profileId not found";    
        }        
    }catch(e){
        // logger.log('error', e.stack, {logId: sessionId});
    }  
    //logger.log('info', "mapSessionIdDelete()> result= "+ result + " new map size is= " + mapSessionId.size, {logId: sessionId});
    console.log('mapmapIsAgentAssignedDelete()> result= '+result)
    return result;  
}

exports.mapbotConversationGet =  mapbotConversationGet;
exports.mapIsAgentAssignedGet =  mapIsAgentAssignedGet;