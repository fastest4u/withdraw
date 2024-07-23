import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, onSnapshot, setDoc,addDoc ,query, where,} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCh9UVqDFzDKaInxNxxQqXc78L6v8hem1U",
    authDomain: "myweb-8a08b.firebaseapp.com",
    projectId: "myweb-8a08b",
    storageBucket: "myweb-8a08b.appspot.com",
    messagingSenderId: "411336314344",
    appId: "1:411336314344:web:cf3f48f027f8adad91285d",
    measurementId: "G-ZDHHFSV709"
};

function initializeFirebase() {
    return initializeApp(firebaseConfig);
}

function getFirestoreDb(app) {
    return getFirestore(app);
}
async function getuser(uid) {
   
    const app = initializeFirebase();
    const db = getFirestoreDb(app);
    const userCollection = collection(db, "user");
    const q = query(userCollection, where("userId", "==",uid));


    try {
        // เพิ่มข้อมูลใหม่ไปยังคอลเล็กชัน
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                    return true
                } else {
                    return false
                }
            });
        });
    } catch (e) {
        console.error("Error adding document: ", e);    
    } 




}
