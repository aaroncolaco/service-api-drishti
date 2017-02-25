'use strict';

const Clarifai = require('clarifai');
const execFile = require('child_process').execFile;
const fork = require('child_process').fork;
const fs = require('fs');
const spawn = require('child_process').spawn;

const config = require('../config');

const clarifyApp = new Clarifai.App(
  config.getClarifyClientId(),
  config.getClarifyClientSecret()
);

// clarifai
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

// get first level info - mock route : `\upload`
const firstLevelInfo = (req, res, next) => {
  const foo = new Buffer(fs.readFileSync(req.file.path)).toString("base64");

  // const pyFork = fork('lib/pushViaFirebase');
  const json = {
    "result": "A group of people",
    "image_id": "432432"
  };

  // return res.send(req.file.path);
  res.json(json);
};

// return people in image
const getPeopleInImage = (req, res) => {

  let options = {
    stdio: ['pipe']
  };

  let pySpawn = spawn(
    'python',
    ['python_scripts/predict.py', req.file.path], // path from root of project directory
    options
  );

  // called on every write to stdout
  pySpawn.stdout.on('data', function(data) {
    console.log(data);
    let prediction = {};
    try{
        prediction = JSON.parse(data);
    }catch(err){
        console.error(err);
        return res.end("ERROR");
    }
    return res.json(prediction);
  });

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

  /*process.on("SIGINT", function() { console.log("sigint caught") });

  // parent.js
  var fork = require("child_process").fork,
      child = fork(__dirname + "/child.js");*/

};

module.exports = {
  firstLevelInfo,
  getPeopleInImage,
  imageInfo,
  sendImgToScript
};
