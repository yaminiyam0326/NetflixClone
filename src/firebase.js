
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "",
  authDomain: "netflix-clone-bdf48.firebaseapp.com",
  projectId: "netflix-clone-bdf48",
  storageBucket: "netflix-clone-bdf48.appspot.com",
  messagingSenderId: "819946207056",
  appId: "1:819946207056:web:b07d033d1af3ab113c5e55"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);

const signup =  async (name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.displayName,
            name,
            authProvider:"local",
            email,
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};
