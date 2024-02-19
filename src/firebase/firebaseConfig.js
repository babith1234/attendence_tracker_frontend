import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtiEPa2etmJgDa6FEY11nIdqrWMWzjbzs",
  authDomain: "attendencetracker-ca4cd.firebaseapp.com",
  projectId: "attendencetracker-ca4cd",
  storageBucket: "attendencetracker-ca4cd.appspot.com",
  messagingSenderId: "748672728840",
  appId: "1:748672728840:web:10e8e9b2f4f1c9d8ad36bd",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export{storage}