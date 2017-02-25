'use strict';

const pushViaFirebase = require('pushViaFirebase');

module.exports = {
  pushViaFirebase: function(data) {
    return pushViaFirebase(data);
  };
};