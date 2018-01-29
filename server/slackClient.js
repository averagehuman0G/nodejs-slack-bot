'use strict';
const { RtmClient, CLIENT_EVENTS } = require('@slack/client');

function logOnAuthentication(rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function hasAuthenticated(rtm, handler) {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel) {
  const rtm = new RtmClient(token, { logLevel: logLevel });
  hasAuthenticated(rtm, logOnAuthentication);
  return rtm;
};

module.exports.hasAuthenticated = hasAuthenticated;
