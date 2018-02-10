'use strict';

class ServiceRegistry {
  constructor() {
    this._services = {};
    this._timeout = 30;
  }

  add(intent, ip, port) {
    const key = intent + port;
    // If this is a new service then it adds it otherwise it will just update the timestamp on the existing service
    if (!this._services[key]) {
      this._services[key] = {};
      this._services[key].timestamp = Math.floor(new Date() / 1000);
      this._services[key].ip = ip;
      this._services[key].port = port;
      this._services[key].intent = intent;
      console.log(
        `Added service for ${this._services[key].intent} on ${this._services[key].ip}:${this._services[key].port}`,
      );
      this._removeUnavailableServices();
      return;
    }
    //updates the timestamp if the servie already exists
    this._services[key].timestamp = Math.floor(new Date() / 1000);
    console.log(
      `updated service for ${this._services[key].intent} on ${this._services[key].ip}:${this._services[key].port}`,
    );
    this._removeUnavailableServices();
  }

  remove(intent, ip, port) {
    const key = intent + port;
    delete this._services[key];
  }

  get(intent) {
    this._removeUnavailableServices();
    for (let key in this._services) {
      if (intent === this._services[key].intent) return this._services[key].intent;
      return null;
    }
  }

  _removeUnavailableServices() {
    const now = new Date() / 1000;
    for (let key in this._services) {
      if (this._services[key].timestamp + this._timeout < now) {
        console.log(`Removed service for ${this._services[key].intent} intent.`);
        delete this._services[key];
      }
    }
  }
}

module.exports = ServiceRegistry;
