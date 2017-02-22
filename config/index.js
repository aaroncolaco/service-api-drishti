'use strict'

const env = process.env.NODE_ENV || 'development';

const config = require('./config');

const envtConfig = config[env]; // gets environment dependent config values


module.exports = {
  getClarifyClientId: function () {
    return process.env.clarifyClientId || envtConfig.clarifyClientId;
  },
  getClarifyClientSecret : function () {
    return process.env.clarifyClientSecret || envtConfig.clarifyClientSecret;
  },
  getEnv: function () {
    return env;
  },
  getSeedStudyData: function () {
    return seedStudyData;
  },
  getStatusMsgs : function () {
    return config.statusMsgs;
  }
}