const { RtmClient, CLIENT_EVENTS } = require('@slack/client');

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN;
// Cache of data
const appData = {};

// Initialize the RTM client with the recommended settings. Using the defaults for these
// settings is deprecated.
const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true,
});

// The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
// (before the connection is open)

// rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, connectData => {
//   // Cache the data necessary for this app in memory
//   appData.selfId = connectData.self.id;
//   console.log(`Logged in as ${appData.selfId} of team ${connectData.team.id}`);
// });

// The client will emit an RTM.RTM_CONNECTION_OPENED the connection is ready for
// sending and recieving messages
// rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
//   console.log(`Ready`);
// });

// Start the connecting process
rtm.start();
