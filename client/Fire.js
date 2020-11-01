import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDx2FubLN8JauMluxTOHB0yNVSUakgdUfU",
        authDomain: "native-functions.firebaseapp.com",
        databaseURL: "https://native-functions.firebaseio.com",
        projectId: "native-functions",
        storageBucket: "native-functions.appspot.com",
        messagingSenderId: "348468022893",
        appId: "1:348468022893:web:683f241595077b45a9f964",
        measurementId: "G-SJE2QT2YPT",
      });
    }
  };
  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };
  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };
  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      user,
      text,
    };
  };
  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };
  off() {
    this.db.off();
  }
  get db() {
    return firebase.database().ref("messages");
  }
  get uuid() {
    return (firebase.auth().currentUser || {}).uuid;
  }
}

export default new Fire();
