// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {firestorePlugin} from 'vuefire'
import Vuetify from 'vuetify'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store/store'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/dist/vuetify.min'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(firestorePlugin)

const config = {
  apiKey: 'AIzaSyDrrnBgjnxH0ZJ6egiDbrQVOZi9zeFKslE',
  authDomain: 'deep-bb702.firebaseapp.com',
  databaseURL: 'https://deep-bb702.firebaseio.com',
  projectId: 'deep-bb702',
  storageBucket: 'deep-bb702.appspot.com',
  messagingSenderId: '157821353699'
}
const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()

export default firestore

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
