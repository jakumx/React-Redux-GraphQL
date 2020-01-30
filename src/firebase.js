import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASU_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics();

const db = firebase.firestore().collection(process.env.REACT_APP_DB)

export function getFavorites(uid) {
  return db.doc(uid).get().then(snap => snap.data().favorites)
}

export function updateDB(favorites, uid) {
  db.doc(uid).set({ favorites })
} 

export function signOutGoogle() {
  firebase.auth().signOut()
}

export function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider).then(snap => snap.user)
}