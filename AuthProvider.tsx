import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './util/firebase-config';

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';
type Error = { error: { message: string } };
// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
}

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  console.log('user in AuthContextprovider: ', user);
  // SingUp
  const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn
  const logIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = async () => {
    setUser({ email: null, uid: null });
    return await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
