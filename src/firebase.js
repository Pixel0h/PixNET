import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/performance';

const config = {
    apiKey: "AIzaSyBOxwt8taJCt1SmW_wF3hGxUg9JYo2Oqpk",
    authDomain: "pixnet-prod.firebaseapp.com",
    projectId: "pixnet-prod",
    storageBucket: "pixnet-prod.appspot.com",
    messagingSenderId: "741119417433",
    appId: "1:741119417433:web:d98082129cd5be4caca548",
    measurementId: "G-6XQ5WC7HTZ"
}

firebase.initializeApp(config);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const analytics = firebase.analytics();
const performance = firebase.performance();

export {
    auth,
    firestore,
    storage,
    analytics,
    performance,
    firebase as default
}