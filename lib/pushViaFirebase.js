'use strict';

/*const FCM = require('fcm-push');
const firebase = require("firebase");

const serverKey = 'AAAAqbc0vrg:APA91bE3-V7VdPTF5SFhNcUaIB_hI0245BHBufJsLq_PeuUQ_k2LKS92tWcpf_TSiAUfTktI75tPWwuce5ck37xpUFy0HpWMJyLhZIIsslP4cmiZ57RV9VUO4sBsChbYjINXibXyia9D';
const fcm = new FCM(serverKey);

const pushViaFirebase = () => {
  const message = {
    to: 'drishti', // required fill with device token or topics
    collapse_key: 'sdf3245',
    data: {
      your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
      title: 'Test Title',
      body: 'Test Body'
    }
  };

  fcm.send(message, (err, response) => {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};*/


setInterval(() => {
  console.log("Hello World")
}, 2000)