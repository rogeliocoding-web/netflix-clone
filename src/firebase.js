
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/web-extension";
import { createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword} from "firebase/auth/";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore/";


const firebaseConfig = {
  apiKey: "AIzaSyABOkgmaouYK92-7Hi7UN6OHGabzhkuunY",
  authDomain: "netflix-clone-77e48.firebaseapp.com",
  projectId: "netflix-clone-77e48",
  storageBucket: "netflix-clone-77e48.firebasestorage.app",
  messagingSenderId: "438635991647",
  appId: "1:438635991647:web:8404e10e5c6a0ed34f41ea"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const singup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        return res;
        await addDoc (collection(db, 'users'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error);
        allert(error);
    }
}

const login = async(email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);

    }catch (error) {
        console.log(error);
        allert(error);
    }
}

const logout = () => {
    signOut(auth);
}


export {auth, db, singup, login, logout}

