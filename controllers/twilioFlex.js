let sessionId = null;
const twilio=require('twilio')
var flex=require('./flex')
const twlioObj=require('./twilio')
const bot_conversation =require('./bot_conversation')

const flexSession=require("./flex_sessionid")

exports.get_request = function (req, res) {
    try{
    res.send('This is NodeJs app, which contains the webhook code for whatsapp bot. Use this url in fullfilment section of Dialogflow');
    console.log('info',"get_request()> Res to user= This is NodeJs app, which contains the webhook code for whatsapp bot. Use this url in fullfilment section of Dialogflow");
}
catch(e){
    console.log('error', e.stack, { logId: sessionId});
} 
}

exports.whatsapp_webhook_request = async function (req, res) {
    console.log(req.body)
   await flex.sendMessageToFlex('hi');
    res.send('This is NodeJs app, which contains the webhook code for whatsapp bot. Use this url in fullfilment section of Dialogflow');
    
}

exports.delete_channel=async function(req,res){
    const accountSid = 'ACa89fb7cc00ba78291caf0ca58fc51572';
const authToken = 'c27fedbba79e8e94c9629cf778a77dc0';
const client = require('twilio')(accountSid, authToken);

client.flexApi.channel('CH8336134570934bda8350286ef3ac787e').remove();
res.send('This is NodeJs app, which deletes channel');
    
}

exports.new_message=function(request, response) {
    console.log('new-message() Twilio new message webhook fired');
    console.log(request.body.Body)
    if (request.body.Source === 'SDK' ) {
        //excuted when chat from agent to customer
        console.log("new-message() chat message io.emit")  
        console.log("this message will be send to whatsapp user = "+request.body.Body)  
        //send to whatsapp
        console.log(request.body.ChannelSid)
        
        const twilio=require('twilio')
        const client=twilio('ACa89fb7cc00ba78291caf0ca58fc51572','c27fedbba79e8e94c9629cf778a77dc0')
        console.log(request.body)
        //call mapSessionIdGet
        var sessionData= flexSession.mapSessionIdGet(request.body.ChannelSid)
        console.log(sessionData[0])
        client.messages.create({
            from:'whatsapp:+14155238886',
            to:sessionData[0],
            body:request.body.Body
            
        })
        .then(messages=>{
            console.log(messages)
        })
        .catch(error=>{
            console.error(error)
        })


    }
    else{
        var sessionData= flexSession.mapSessionIdGet(request.body.ChannelSid)
        var isAgentJustAssigned=bot_conversation.mapIsAgentAssignedGet(sessionData[0])
        console.log("isAgentJustAssigned = "+isAgentJustAssigned)
        if(isAgentJustAssigned!=undefined){
            const twilio=require('twilio')
            const client=twilio('ACa89fb7cc00ba78291caf0ca58fc51572','c27fedbba79e8e94c9629cf778a77dc0')
            //call mapSessionIdGet
            
            console.log(sessionData[0])
            client.messages.create({
                from:'whatsapp:+14155238886',
                to:sessionData[0],
                body:'Hi, I am here to assist you',
                mediaUrl:'https://i.imgur.com/uxGGKuG.jpg'
            })
            .then(messages=>{
                console.log(messages)
            })
            .catch(error=>{
                console.error(error)
            })
            bot_conversation.mapIsAgentAssignedDelete(sessionData[0])
        }
    }
    
    response.sendStatus(200);
    console.log('new-message() response.sendStatus(200)');
  }

  exports.channel_update=function(request, response) {
    console.log('channel-update() Twilio channel update webhook fired');
    let status = JSON.parse(request.body.Attributes).status;
    console.log('channel-update() Channel ChannelSid: ' +request.body.ChannelSid)
    console.log('channel-update() Channel Status: ' + status);
    console.log('channel-update() calling flex.resetChannel(status,ChannelSid)');
    
    var whatsappNumber=flexSession.mapSessionIdGet(request.body.ChannelSid)
    
    sendAgentFeedbackMessage(whatsappNumber[0])
    flex.resetChannel(status,request.body.ChannelSid);
    response.sendStatus(200);
    console.log('channel-update() response.sendStatus(200)');
  }

  function sendAgentConversationEndMessage(whatsappNumber){
      
    twlioObj.sendMessage(whatsappNumber,'Conversation with agent is complete')
    //setTimeout(sendAgentFeedbackMessage, 2000,whatsappNumber);

  }

  function sendAgentFeedbackMessage(whatsappNumber){
      
    twlioObj.sendMessage(whatsappNumber,'I hope you have received your expected services.\n\n⭐ Please rate our service on a scale of 1 to 5 where 1 is low 😡 and 5 is highest😀')
    
  }