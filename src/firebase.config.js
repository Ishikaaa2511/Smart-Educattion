import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCCGq0Wz-13fSHoy841Ue4siusLQJe7bHc",
  authDomain: "eduu-c53fe.firebaseapp.com",
  projectId: "eduu-c53fe",
  storageBucket: "eduu-c53fe.appspot.com",
  messagingSenderId: "389236589434",
  appId: "1:389236589434:web:8fbbe813fe633c79154cc3",
  measurementId: "G-ZHFZZT3KGT"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;