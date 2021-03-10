import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDqSDm9-irCNK9VkvkhGCfxsskPniyu3Yw',
  authDomain: 'learn-firebase-auth-a0adb.firebaseapp.com',
  projectId: 'learn-firebase-auth-a0adb',
  storageBucket: 'learn-firebase-auth-a0adb.appspot.com',
  messagingSenderId: '50350283624',
  appId: '1:50350283624:web:4cb47ed8df8ce77ea1d4dd',
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export default firebase
