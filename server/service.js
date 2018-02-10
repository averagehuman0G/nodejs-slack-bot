'use strict';

const express = require('express');
const service = express();

service.put('/service/:intent/:port', (req, res, next) => {
  const newService = req.params.intent;
  const port = req.params.port;
  const remoteIp = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]`
    : req.connection.remoteAddress;
  res.json({ result: `${newService} will be added to ${remoteIp}:${port}` });
});

module.exports = service;
