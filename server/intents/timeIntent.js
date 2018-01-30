'use strict';

module.exports.process = function process(intentData, cb) {
  if(intentData.intent[0].value != 'time') {
    return cb(new Error(`Expected a time intent and instead got ${intentData.intent[0].value}`));
  }
  if(!intentData.location) {
    return cb(new Error('Missing location in time intent'));
  }
  return cb(null, `The API for me to get the time for in ${intentData.location[0].value} still hasn't been implemented, have patience with me.`);
}
