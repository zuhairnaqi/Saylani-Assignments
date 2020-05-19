// import ReactNative from "react-native";
import firebase from 'firebase'

// const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
const config = {
    apiKey: "AIzaSyA05jjrsK2NZgSyAZcZr7RN1VmSErizRtc",
    authDomain: "zuhairnaqi6.firebaseapp.com",
    databaseURL: "https://zuhairnaqi6.firebaseio.com",
    projectId: "zuhairnaqi6",
    storageBucket: "zuhairnaqi6.appspot.com",
    messagingSenderId: "582996309214"
};
firebase.initializeApp(config);

export default firebase;