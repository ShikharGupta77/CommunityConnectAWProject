import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import React, {
    createContext,
    FC,
    useContext,
    useEffect,
    useState,
} from "react";
import { auth } from "../lib/firebase";

const initValue = {
    currentUser: undefined,
    login: (email, password) => {},
    signup: (email, password) => {},
    logout: () => {},
    loggedIn: false,
};

const AuthContext = createContext(initValue);

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log("In AuthProvider, user = ", user);
            if (user != null) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                const { ccp, name, phoneNumber } = docSnap.data();
                } else {
                await setDoc(docRef, {
                    ccp: 0,
                    name: "",
                    phoneNumber: "",
                });
                return { user.uid, "", "", ""};
                setCurrentUser(userModel);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => setLoggedIn(!!currentUser), [currentUser]);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        loggedIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
