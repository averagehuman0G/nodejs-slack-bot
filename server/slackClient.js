'use strict';
const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');
let rtm = null;
let nlp = null;

function logOnAuthentication(rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message) {
  //if you talk to the bot then it tries to understand what you ask
  if(message.text.toLowerCase().includes(process.env.BOT_NAME)) {
    //asks the natural language processor
    nlp.ask(message.text, (err,res) => {
      if(err) {
        console.log(err);
        return;
      }
      try {
        if(!res.intent || !res.intent[0] || !res.intent[0].value) {
          throw new Error('There was no intent to be understood');
        }
        const intent = require(`./intents/${res.intent[0].value}Intent`);
        intent.process(res, function(err, response) {
          if(err) {
            console.log(err);
            return;
          }
          rtm.sendMessage(response, message.channel);
        })
      } catch(err) {
        console.log(err);
        console.log(response);
        rtm.sendMessage("I don't understand what you are saying, this could be an error reaching my natural language processor", message.channel);
      }
      if(!res.intent) {
        return rtm.sendMessage('What are you even sayin boi', message.channel);
      } else {
        console.log(res);
        return rtm.sendMessage('What are you even sayin boi', message.channel);
      }

    });
  }

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
