'use strict';
const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');
let rtm = null;
function logOnAuthentication(rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message) {
  console.log(message);
  rtm.sendMessage('wus good!!!', message.channel)
    // Returns a promise that resolves when the message is sent
    .then(() => console.log(`Message sent`))
    .catch(console.error);
}

function hasAuthenticated(rtm, handler) {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel) {
  rtm = new RtmClient(token, { logLevel: logLevel });
  hasAuthenticated(rtm, logOnAuthentication);
  rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
  return rtm;
};

module.exports.hasAuthenticated = hasAuthenticated;
