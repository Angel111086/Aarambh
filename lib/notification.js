// //var FCM = require('fcm-node');
// var FCM = require('fcm-push');
// var serverFile = '../serverkey.json'; // put your server key here
// var serverKey = 'AAAA0NOe7GE:APA91bG9yw63TiPt0PvUWKHM2X5Pzyk3xKTcyo54EB0jMDA6LB1m5UF1dBHfn7RNueFtzs8ZeBMQm6n98RjNqmlvo5vls35eir1MM0FzmIzW6HQep2g98Vv3tpF-QkA_wGlXO0Qj3Wyi';
// var fcm = new FCM(serverKey);

// var collapseKey = 'Test Collapse Key';
// var client_key = 'dDwCPdSrRJG-o1nmqwrclK:APA91bFDZTCQVLguJqUaXLcr7EfhajIU1dl4e5775BYOlC9VDi1mvOGVN163kpeazHtGOQD5Ntz0fJvCS7TJJYWqGFVIw9Ss9Nrsn1AuVuldJFjwI2Oa62uVc318jo-wS00U491Qi4ZD';
// var registrationToken = client_key;


// var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//         to: client_key, 
//         collapse_key: collapseKey,
//         time_to_live: 60 * 60 * 24,
        
//         notification: {
//             title: 'Title of your push notification', 
//             body: 'Body of your push notification',
//             tag: collapseKey,
//             color: '#18d821',
// 			sound: 'default', 
//         },
        
//         data: {  //you can send only notification or only data(or include both)
//             my_key: 'my value',
//             my_another_key: 'my another value'
//         }
//     };



// Fcm.sendMessage = function(message, result)
// {
// 	fcm.send(message, function(err, response){
//         if (err) {
//             console.log("Something has gone wrong!" + err);
//         } else {
//             console.log("Successfully sent with response: ", response);
//         }
//     });
// }


// module.exports = Fcm;


 const firebase = require("firebase-admin");
	
 
	
//   const serviceAccount = require('../serverkey.json');
	
 
	
//   // The Firebase token of the device which will get the notification
	
//   // It can be a string or an array of strings


//   const firebaseToken = client_key;
		
//   firebase.initializeApp({
	
//     credential: firebase.credential.cert(serviceAccount),
	
//     databaseURL: "https://aarambh-app.firebaseio.com"
	
//   });
	
 
// // var registrationToken = [client_key];

// var topic = "finance";

// firebase.messaging().subscribeToTopic(registrationToken, topic)
//   .then(function(response) {
//     console.log("Successfully subscribed to topic:", response);
//   })
//   .catch(function(error) {
//     console.log("Error subscribing to topic:", error);
//   });


	
//   const payload = {
	
//     notification: {
	
//       title: 'Notification Title',
	
//       body: 'This is an example notification',
	
//     }
	
//   };
	
 
	
//   const options = {
	
//     priority: 'high',
	
//     timeToLive: 60 * 60 * 24, // 1 day
	
//   };
	
 
	
//   firebase.messaging().sendToDevice(firebaseToken, payload, options).then(function (response) {
//   console.log("Successfully sent message: ", JSON.stringify(response));
//    return;
// }).catch(function (error) {
//   console.log("Error sending message: ", error);
//   return;
// });






// var payload = {
//   notification: {
//     title: "NASDAQ News",
//     body: "The NASDAQ climbs for the second day. Closes up 0.60%."
//   }
// };

// var topic = "finance";

// firebase.messaging().sendToTopic(topic, payload)
//   .then(function(response) {
//     console.log("Successfully sent message:", response);
//   })
//   .catch(function(error) {
//     console.log("Error sending message:", error);
//   });



	
const serviceAccount = require('../serverkey.json');
  //var client_key = 'cOjkOm42SSCehAPbPC3ZMG:APA91bGkXyRV5G_kn1lvS_Tl2HdU3GjlwKGs7mQpb2Fa85RTAzqaPD66OjmHmZ9JGw5Xp3ICRizSUjUYz4KDoC4ynzIvN6ADyQXGeXijtKIAlilbpP_Lqc6RfJm8m2KBDo-V0gTYgMiY';
		
   firebase.initializeApp({
	
     credential: firebase.credential.cert(serviceAccount),
	
     //databaseURL: "https://aarambh-app.firebaseio.com"
	
   });


   const Fcm = function() {  }

//var topicName = 'industry-tech';
var client_key = [];
Fcm.addTopic = function (client_key, topicName, result)
{
   firebase.messaging().subscribeToTopic(client_key, topicName)
  .then(function(response) {
    //console.log("Successfully subscribed to topic:", response);
    result(null, "Successfully subscribed to topic:" + response);
  })
  .catch(function(error) {
    //console.log("Error subscribing to topic:", error);
     result("Error subscribing to topic: " + error, null);
  });
}

Fcm.schoolMessage = function(msgtitle, msgbody, topic, result){
var message = {
  notification: {
    title: msgtitle,
    body: msgbody
  },
  android: {
    notification: {
      icon: 'stock_ticker_update',
      color: '#7e55c3'
    }
  },
  topic: topic,
};

firebase.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    //console.log('Successfully sent message:', response);
    result(null, 'Successfully sent message:' + response);
  })
  .catch((error) => {
    //console.log('Error sending message:', error);
    result('Error sending message:'+ error, null);
  });

}
module.exports= Fcm;