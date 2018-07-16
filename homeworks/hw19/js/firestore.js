const FirestoreInit = (function () {
  var instance;
  var config = {
    apiKey: "AIzaSyBnZkt81Bx6gwl55gesG0yUUloqSMxgeAY",
    authDomain: "easycode-news-app-3a08a.firebaseapp.com",
    databaseURL: "https://easycode-news-app-3a08a.firebaseio.com",
    projectId: "easycode-news-app-3a08a",
    storageBucket: "easycode-news-app-3a08a.appspot.com",
    messagingSenderId: "409578343585"
  };
  firebase.initializeApp(config);

  var db = firebase.firestore();

  function getDb() {
    return db;
  }

  function createInstance() {
    return {
      getDb
    }
  }

  return {
    getInstance() {
      return instance || (instance = createInstance());
    }
  }

})();