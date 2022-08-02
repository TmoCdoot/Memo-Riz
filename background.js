// detect extension close
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() {
            console.log("closed")
        });
    }
});


const value = {
    title: "test",
    data: "oui"
}

chrome.storage.local.set({dza: value});

//get localStorage on popup.js
chrome.storage.local.get(['localStorage'], function(result) {
    console.log(result);
});


try {

    self.importScripts('firebase/firebase-compat.js');

    const firebaseConfig = {
      apiKey: "AIzaSyAFvfdBIwHEr27ysIRKmiZTKAEhI7wPJHE",
      authDomain: "memoriz-7e7ee.firebaseapp.com",
      projectId: "memoriz-7e7ee",
      storageBucket: "memoriz-7e7ee.appspot.com",
      messagingSenderId: "862117514720",
      appId: "1:862117514720:web:acacaa07ed5ef5a58faf85",
      measurementId: "G-RLMQSTJMR0"
    };

  firebase.initializeApp(firebaseConfig)

  var db = firebase.firestore();

  console.log(db)

  db.collection('test').doc('byXxc6fsnPeYLI8juU8f').get().then((snapshot) => {
    var data = snapshot.data()
    console.log(data)
  })

} catch (e) {
    console.log(e)    
}

