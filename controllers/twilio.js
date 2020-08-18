let sessionId = null;
const twilio=require('twilio');
const config = require("../config");
const dialogflow = require("./dialogflow");
const flexSession=require("./flex_sessionid");
const bot_conversation=require("./bot_conversation");
let users = new Map([
  ["whatsapp:+919930755383", "Tanvi"],
  ["whatsapp:+919810606741", "Mehool"],
  ["whatsapp:+919930136022", "Satish"],
  ["whatsapp:+918691925774", "Rajneesh"],
  ["whatsapp:+919930135784", "Prashant"],
  ["whatsapp:+919768683886", "Bhavin"]
]);


exports.get_request = function (req, res) {
    try{
    res.send('This is NodeJs app, which contains the webhook code for whatsapp bot. Use this url in fullfilment section of Dialogflow');
    console.log('info',"get_request()> Res to user= This is NodeJs app, which contains the webhook code for whatsapp bot. Use this url in fullfilment section of Dialogflow");
}
catch(e){
    console.log('error', e.stack, { logId: sessionId});
} 
}

async function convertToWhatsappMessage(responses) {
  let reply = null;
  try{
  if (Array.isArray(responses)) {
    await responses.forEach(async (response)=> {
     
      console.log(response.platform)
      if(response.platform=="PLATFORM_UNSPECIFIED"){
        
        if(response.text!=undefined){
          if (response.text.text[0] !== '') {
            reply = response.text.text[0];
            }
        }
        
      }
      
    });
  }
}
catch(e){
  logger.log('error',JSON.stringify(e))
}
  return reply;
}



var flex=require('./flex')
exports.whatsapp_webhook_request = async function (req, res) {
    
twilio('ACa89fb7cc00ba78291caf0ca58fc51572','c27fedbba79e8e94c9629cf778a77dc0')
const { MessagingResponse } = twilio.twiml;
    const twiml = new MessagingResponse();
    const inputQuery = req.body.Body;
    var userId=req.body.From;
    var setAgent='false'
    console.log(req.body)
    try {
    //   const result = await customsearch.cse.list(options);
    //   const firstResult = result.data.items[0];
    //   const searchData = firstResult.snippet;
    //   const link = firstResult.link;
    // if(q=='talk to agent'){
    //   setAgent='true'
    //   await flex.sendMessageToFlex(userId, 'hi');
    //   return;
    // }
    
    if(flexSession.mapChannelSidGet(req.body.From)!='false'){
      setAgent='true'
    }
    console.log(setAgent)
    if(setAgent=='false'){
    bot_conversation.mapbotSessionCreate(req.body.From,inputQuery)
    var result=await dialogflow.detectTextIntent(userId,inputQuery)
     console.log(result)   
    var fulfillment=result.fulfillmentMessages;
  
    var reply=await convertToWhatsappMessage(fulfillment)
    
    if(reply!=null && reply.includes("<NAME>")){
      var userDetails=users.get(req.body.From); 
      console.log(userDetails)
      if(userDetails==undefined){
        userDetails='user'
      }
      reply=reply.toString().replace("<NAME>", userDetails);
    }
    bot_conversation.mapbotSessionCreate(req.body.From,reply);
    if(result.intent.displayName=='agent_transfer'||result.intent.displayName=='agent_transfer_default'){
      setAgent='true'
      var test=bot_conversation.mapIsAgentAssignedCreate(req.body.From);
      console.log("mapIsAgentAssignedCreate called "+req.body.From+" "+test);
      await sendBotConversationToFlex(userId)
      // await flex.sendMessageToFlex(userId, 'hi');
    }
    twiml.message(`${reply}`);
        console.log(reply)
        res.set('Content-Type', 'text/xml');
        
        return res.status(200).send(twiml.toString());
    }
    else{
      
      await flex.sendMessageToFlex(userId, inputQuery);
      return;
    }
        
    } catch (error) {
        console.log(error)
        return next(error);
    }
}

exports.sendMessage=function (WhatsappNumber,messageData){
  const twilio=require('twilio')
  const client=twilio('ACa89fb7cc00ba78291caf0ca58fc51572','c27fedbba79e8e94c9629cf778a77dc0')
  client.messages.create({
    from:'whatsapp:+14155238886',
    to:WhatsappNumber,
    body:messageData
  })
  .then(messages=>{
      console.log(messages)
  })
  .catch(error=>{
      console.error(error)
  })
}

exports.sendMediaMessage=function (WhatsappNumber,messageData,mediaLink){
  const twilio=require('twilio')
  const client=twilio('ACa89fb7cc00ba78291caf0ca58fc51572','c27fedbba79e8e94c9629cf778a77dc0')
  client.messages.create({
    from:'whatsapp:+14155238886',
    to:WhatsappNumber,
    body:messageData,
    mediaUrl:mediaLink
  })
  .then(messages=>{
      console.log(messages)
  })
  .catch(error=>{
      console.error(error)
  })
}

async function sendBotConversationToFlex(userId){
  var converdationDetails=bot_conversation.mapbotConversationGet(userId);
  console.log(converdationDetails)
  myFunction(converdationDetails,userId,0)
  // var i=0;
  // var conversation='';
  // for(let val of converdationDetails) {
    
  
  //     conversation+='\n\n\n'
  //     if(i%2==0){
  //       conversation+=userId+'\n'
  //     }
  //     else{
  //       conversation+='Bot\n'
  //     }
  //    conversation+=val;
  //     i++;
  // }
  // await flex.sendBotMessageToFlex(userId, 'Conversation',conversation);
  bot_conversation.mapbotConversationDelete(userId);
}

async function myFunction(converdationDetails,userId,counter) {
  console.log(converdationDetails)
  console.log(counter)
  console.log(converdationDetails[counter]);
  console.log(converdationDetails.length)

  // create options object here
  //var options = {
  //    host:'www.host.com',
  //    path:'/path/'+counter
  //};
  //makeRequest(options, counter);
  if(counter%2==0){
    await flex.sendBotMessageToFlex(userId, userId,converdationDetails[counter]);
  }
  else{
    await flex.sendBotMessageToFlex(userId, 'Bot',converdationDetails[counter]);
  }
  console.log(converdationDetails[counter]+" "+new Date())
  counter++;
  
  if (counter < converdationDetails.length) {
    
      setTimeout(myFunction, 2000,converdationDetails,userId,counter);    
  }
  else{
    // var test=bot_conversation.mapIsAgentAssignedCreate(userId)
    // console.log("mapIsAgentAssignedCreate called "+userId+" "+test);
  }
}
