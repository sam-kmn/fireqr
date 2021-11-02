import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/compat/app';

import 'bootstrap'

var firebaseConfig = {
  apiKey: "AIzaSyAWK4hpge-BWjBxvku4KcHm3HzE92SPUeM",
  authDomain: "fireqr-generator.firebaseapp.com",
  databaseURL: "https://fireqr-generator-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fireqr-generator",
  storageBucket: "fireqr-generator.appspot.com",
  messagingSenderId: "40576863127",
  appId: "1:40576863127:web:7c3865e9c28d46839752d2"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
