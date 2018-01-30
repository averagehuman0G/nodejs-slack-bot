'use strict';
const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');
let rtm = null;
let nlp = null;

function logOnAuthentication(rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message) {
  nlp.ask(message.text, (err,res) => {
    if(err) {
      console.log(err);
      return;
    }
    if(!res.intent) {
      return rtm.sendMessage('What are you even sayin boi', message.channel);
    } else if(res.intent[0].value == 'time' && res.location) {
      return rtm.sendMessage(`I know you are trying to get the time for ${res.location[0].value}, but your boi hasn't implemented that yet`, message.channel);
    } else {
      console.log(res);
      return rtm.sendMessage('What are you even sayin boi', message.channel);
    }

  });
}

function hasAuthenticated(rtm, handler) {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel, nlpClient) {
  rtm = new RtmClient(token, { logLevel: logLevel });
  nlp = nlpClient;
  hasAuthenticated(rtm, logOnAuthentication);
  rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
  return rtm;
};

module.exports.hasAuthenticated = hasAuthenticated;
