'use strict';

const Clarifai = require('clarifai');
const fs = require('fs');
const spawn = require('child_process').spawn;

const config = require('../config');

const clarifyApp = new Clarifai.App(
  config.getClarifyClientId(),
  config.getClarifyClientSecret()
);


const imageInfo = (req, res, next) => {
  const foo = new Buffer(fs.readFileSync(req.file.path)).toString("base64");

  clarifyApp.models.predict(Clarifai.GENERAL_MODEL, {base64: foo}).then(
    function(response) {
      console.log(response);
      return res.json(response);
    },
    function(err) {
      console.error(err);
      res.json(err);
    }
  );
};

const sendImgToScript = (req, res, next) => {
  // const imageBase64 = new Buffer(fs.readFileSync(req.file.path)).toString("base64");

  let options = {
    stdio: ['pipe']
  };

  let pySpawn = spawn(
    'python',
    ['python_scripts/main.py'], // path from root of project directory
    options
  );

  // called on every write to stdout
  pySpawn.stdout.on('data', function(data) {
    console.log(data);
    return res.send(data)
  });

  // when python script ends
 /* pySpawn.on('close', function(code) {
    if (code !== 0) {
      console.log("Python error code: " + code)
      return res.status(500).send(code);
    }
    return res.status(200).end(scriptResponse);
  });*/


  /*process.on("SIGINT", function() { console.log("sigint caught") });

  // parent.js
  var fork = require("child_process").fork,
      child = fork(__dirname + "/child.js");*/

};

module.exports = {
  imageInfo,
  sendImgToScript
};