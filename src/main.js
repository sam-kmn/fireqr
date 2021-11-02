import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'

import 'bootstrap'

var firebaseConfig = {
    apiKey: "AIzaSyCq-tehltAMRasBtndCtpFRZlZCQ4Ez9KQ",
    authDomain: "easy-qr-f8c01.firebaseapp.com",
    projectId: "easy-qr-f8c01",
    storageBucket: "easy-qr-f8c01.appspot.com",
    messagingSenderId: "68529783584",
    databaseURL: "https://easy-qr-f8c01-default-rtdb.europe-west1.firebasedatabase.app/",
    appId: "1:68529783584:web:1561437b2b66b067e60d45"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
