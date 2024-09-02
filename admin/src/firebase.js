import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtHE_3JnGS63RW3N0N23NuRpTAxiQ8HTo",
  authDomain: "netflix-org-clone.firebaseapp.com",
  projectId: "netflix-org-clone",
  storageBucket: "netflix-org-clone.appspot.com",
  messagingSenderId: "196926732787",
  appId: "1:196926732787:web:8a2e55b2bda197ff36ba86",
  measurementId: "G-M5PRX5XP0F",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
