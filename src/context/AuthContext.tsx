
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import {
  Auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { IUser } from '../types';

interface IAuthContext {
  currentUser: IUser | null;
  signup: (email: string, pass: string) => Promise<any>;
  login: (email: string, pass: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = (): IAuthContext => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signup    = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass);
  const login     = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout    = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) setCurrentUser({ uid: user.uid, email: user.email });
      else     setCurrentUser(null);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
