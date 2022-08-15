// detect extension close
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() {
            console.log("closed")
            //detection quand la popup se ferme
            chrome.storage.sync.get(['FirebaseStorage'], function(result) {
                
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
                    console.log(result['FirebaseStorage'][val])
                    db.collection('test').doc('byXxc6fsnPeYLI8juU8f').collection('memo').doc(result['FirebaseStorage'][val].title).set(result['FirebaseStorage'][val])
                    }
                                
                } catch (e) {
                    console.log(e)    
                }

            })
        });
    }
});

/*get localStorage on popup.js
chrome.storage.local.get(['dza'], function(result) {
    console.log(result);
});*/

//recuperation des donnes sur firebase
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

  db.collection('test').doc('byXxc6fsnPeYLI8juU8f').collection('memo').get().then((snapshot) => {
    
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




/*
1- recuperation des data sur firebase 
2- parse le resultat de recuperation des donnes
3- ajout des donnes dans le local storage
4- crée la page html avec les donnes dessus
5- terminer page de chargement
*/

