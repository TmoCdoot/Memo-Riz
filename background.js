chrome.storage.sync.get(['user'], function(result) { 

    if (result["user"] != undefined) {
        var uid = result["user"].uid
        
        getFirebaseData(uid)
    }
})

// detect extension close
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() {
            //detection quand la popup se ferme
            chrome.storage.sync.get(['FirebaseStorage'], function(result) {

                chrome.storage.sync.get(['user'], function(userResult) {

                    if (userResult["user"] != undefined) {
                        var uid = userResult["user"].uid

                        setFirebaseData(result, uid)
                    }
                })
            })
        });
    }
});

function setFirebaseData(result, uid) {
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

      for (var val in result['FirebaseStorage']) {
        db.collection('memo_data').doc(uid).collection('user_memo').doc(result['FirebaseStorage'][val].title).set(result['FirebaseStorage'][val])
        }
                    
    } catch (e) {
        console.log(e)    
    }
}

function getFirebaseData(uid) {
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
    
      db.collection('memo_data').doc(uid).collection('user_memo').get().then((snapshot) => {
        
        var tabData = []
        snapshot.forEach(doc => {
            tabData.push(doc.data())
        });
    
        var tab = []
        for (var item in tabData) {
            var val = {
                data: tabData[item].data,
                isLock: tabData[item].isLock,
                title: tabData[item].title,
                time: tabData[item].time
            }
            tab.push(val)
        }
    
        chrome.storage.sync.set({FirebaseStorage: tab});
      })
    
    } catch (e) {
        console.log(e)    
    }
}


