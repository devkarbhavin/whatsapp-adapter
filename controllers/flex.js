// require('dotenv').config();
const fetch = require('node-fetch');
// const { URLSearchParams } = require('url');
 var base64 = require('base-64');

 
const flexSession=require("./flex_sessionid")
const client = require('twilio')(
    'ACa89fb7cc00ba78291caf0ca58fc51572',
  'f0d556481e674578d968f0b445bd8f7f'
);

var flexChannelCreated;

function sendChatMessage(serviceSid, channelSid, chatUserName, body) {
  console.log("sendChatMessage()");
  console.log('sendChatMessage() Sending new chat message');
  const params = new URLSearchParams();
  params.append('Body', body);
  params.append('From', chatUserName);
  return fetch(
    `https://chat.twilio.com/v2/Services/${serviceSid}/Channels/${channelSid}/Messages`,
    {
      method: 'post',
      body: params,
      headers: {
        'X-Twilio-Webhook-Enabled': 'true',
        Authorization: `Basic ${base64.encode(
          `ACa89fb7cc00ba78291caf0ca58fc51572:f0d556481e674578d968f0b445bd8f7f`
        )}`
      }
    }
  );
}

function createNewChannel(flexFlowSid, flexChatService, chatUserName) {
  console.log("createNewChannel()");
  console.log('createNewChannel() return client.flexApi.channel');
  return client.flexApi.channel
    .create({
      // flexFlowSid: process.env.FLEX_FLOW_SID,
      flexFlowSid: flexFlowSid,
      identity: chatUserName,
      chatUserFriendlyName: chatUserName,
      chatFriendlyName: 'Flex Custom Chat',
      target: chatUserName
    })
    .then(channel => {
      console.log(`Created new channel ${channel.sid}`);
      return client.chat
        .services(flexChatService)
        .channels(channel.sid)
        .webhooks.create({
          type: 'webhook',
          'configuration.method': 'POST',
          'configuration.url': `http://35.198.241.88:3000/new-message?channel=${channel.sid}`,
          'configuration.filters': ['onMessageSent']
        })
        .then(() => client.chat
        .services(flexChatService)
        .channels(channel.sid)
        .webhooks.create({
          type: 'webhook',
          'configuration.method': 'POST',
          'configuration.url': `http://35.198.241.88:3000/channel-update`,
          'configuration.filters': ['onChannelUpdated']
        }))
    })
    .then(webhook => webhook.channelSid)
    .catch(error => {
      console.log(error);
    });
    
}

async function resetChannel(status,channelSid) {
  console.log("resetChannel()");
  if (status == 'INACTIVE') {
    flexChannelCreated = false;
    flexSession.mapSessionIdDelete(channelSid);
  }
  
}

async function sendMessageToFlex(userId,msg) {
    //get channelId from userId
  var channelCreated=  flexSession.mapChannelSidGet(userId);
  if (channelCreated=='false') {
    console.log("sendMessageToFlex() flexChannelCreated");
    flexChannelCreated = await createNewChannel(
      'FOc40bda2199c05c01a280d6f6b24b6b6a',
      'ISdceb542982d94c98be872074ec5362cf',
      userId
      //'custom-chat-user1' //name displayed on chat contact of agent
    );
    flexSession.mapSessionIdCreate(flexChannelCreated,userId)
    channelCreated=flexChannelCreated
  }
  
  console.log("sendMessageToFlex() sendChatMessage");
  sendChatMessage(
    'ISdceb542982d94c98be872074ec5362cf',
    channelCreated,
    userId,
    //'socketio-chat-user1',//name displayed on message
    msg
  );
  console.log("sendMessageToFlex()");
}

async function sendBotMessageToFlex(userId,sender,msg) {
  //get channelId from userId
var channelCreated=  flexSession.mapChannelSidGet(userId);
if (channelCreated=='false') {
  console.log("sendMessageToFlex() flexChannelCreated");
  flexChannelCreated = await createNewChannel(
    'FOc40bda2199c05c01a280d6f6b24b6b6a',
    'ISdceb542982d94c98be872074ec5362cf',
    userId
    //'custom-chat-user1' //name displayed on chat contact of agent
  );
  flexSession.mapSessionIdCreate(flexChannelCreated,userId)
  channelCreated=flexChannelCreated
}

console.log("sendMessageToFlex() sendChatMessage");
sendChatMessage(
  'ISdceb542982d94c98be872074ec5362cf',
  channelCreated,
  sender,
  //'socketio-chat-user1',//name displayed on message
  msg
);
console.log("sendMessageToFlex()");
}

exports.sendMessageToFlex = sendMessageToFlex;
exports.resetChannel = resetChannel;
exports.sendBotMessageToFlex = sendBotMessageToFlex;
