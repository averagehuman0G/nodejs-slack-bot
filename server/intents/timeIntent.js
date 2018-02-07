'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
  if(intentData.intent[0].value != 'time') {
    return cb(new Error(`Expected a time intent and instead got ${intentData.intent[0].value}`));
  }
  if(!intentData.location) {
    return cb(new Error('Missing location in time intent'));
  }
  const location = intentData.location[0].value;

  console.log(location);
  request.get(`http://localhost:3010/service/${location}`, function(err, response) {
    if(err || response.statusCode != 200 || !response.body.result) {
      console.log(err);
      console.log(response.body);
      return cb(false, `I had a problem finding out the time in ${location}`)
    }
    const time = response.body.result;
    return cb(false, `In ${location} it is now ${time}`);
  })
}
