import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBNm5XIuWrabHgRMbv7b-BwIQyJXDbBHuk",
    authDomain: "poppy-app-2556f.firebaseapp.com",
    databaseURL: "https://poppy-app-2556f.firebaseio.com",
    projectId: "poppy-app-2556f",
    storageBucket: "poppy-app-2556f.appspot.com",
    messagingSenderId: "819476496836",
    appId: "1:819476496836:web:dcccb6de9995133f136491",
    measurementId: "G-J2BF16D97Q"
  };


export default class Firebase {
    static auth;
    static userInfo= {
        name:""
    };
    static firebase;
    static database;
    static storage;
    static init() {
        firebase.initializeApp(firebaseConfig);
        Firebase.firebase = firebase;
        Firebase.auth = firebase.auth();
        Firebase.database = firebase.database();
        Firebase.storage = firebase.storage();
    }
}