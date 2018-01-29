'use strict';

require('dotenv').config();
const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const slackToken = process.env.SLACK_TOKEN;
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel);

rtm.start();

slackClient.hasAuthenticated(rtm, () => server.listen(3000));

server.on('listening', function() {
  console.log(`listening on port ${server.address().port} in ${service.get('env')} mode`);
});
