'use strict';

const express = require('express');
const service = express();
const ServiceRegistry = require('./serviceRegistry');
const registry = new ServiceRegistry();

service.put('/service/:intent/:port', (req, res, next) => {
  const newService = req.params.intent;
  const port = req.params.port;
  const remoteIP = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]`
    : req.connection.remoteAddress;
  registry.add(newService, remoteIP, port);
  res.json({ result: `${newService} will be added to ${remoteIP}:${port}` });
});

module.exports = service;
