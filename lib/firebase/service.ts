import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from './firebase-config';

export interface FirebaseUserResponse {
  user: User;
}

/*
** Create global handler error, by catch the error and throw it
*/
export const login = async (email: string, password: string): Promise<FirebaseUserResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    console.error("[login error] ==>", error);
    throw error;
  }
}

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("[logout error] ==>", error);
    throw error;
  }
}

export const register = async (email: string, password: string, name?: string): Promise<FirebaseUserResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(userCredential.user, {
        displayName: name
      });
    }
    return { user: userCredential.user };
  } catch (error) {
    console.error("[register error] ==>", error);
    throw error;
  }
}