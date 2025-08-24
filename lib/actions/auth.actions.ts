'use server'

import { auth, db } from "../../firebase/admin";
import { cookies } from "next/headers";
import { SignUpParams, SignInParams, User } from "types";
import { redirect } from "next/navigation";

const ONE_WEEK = 60 * 60 *24 * 7;

// Sign Up function
export async function signUp(params: SignUpParams) {
    const { uid, email, name } = params;
    console.log("SIGNUP CALLED with:", { uid, email, name });

    try {
        const userRef = db.collection('users').doc(uid);
        const userRecord = await userRef.get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists with this email. Please Sign in instead.'
            };
        }

        console.log('Writing user to Firestore:', { uid, name, email });
        await userRef.set({ name, email });

        return {
            success: true,
            message: 'User signed up successfully.'
        };
    }
    catch (e: any) {
        console.error('Error signing up:', e);

        if (e.code === 'auth/email-already-in-use') {
            return {
                success: false,
                message: 'This email is already in use. Please try another one.'
            };
        }

        return {
            success: false,
            message: 'An error occurred during sign up.'
        };
    }
}

// Sign In function
export async function signIn(params: SignInParams){
    const {email,idToken} = params;

    try{
        const decodedToken = await auth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        const userRef = db.collection('users').doc(uid);
        const userRecord = await userRef.get();
        
        if (!userRecord.exists) {
            return {
                success: false,
                message: 'No user found with this email. Please Sign up instead.'
            };
        }

        await setSessionCookie(idToken);
    }
    catch(e){
        console.log(e);
    }
}

// Set session cookie
export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK * 1000 });
    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
}

// Get Current User function
export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie)
        return null;

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const uid = decodedClaims.uid; 
        const userRef = db.collection('users').doc(uid);
        const userRecord = await userRef.get();
        
        if(!userRecord.exists) 
            return null;

        return {...userRecord.data(), id: userRecord.id} as User;
    }
    catch(e){
        console.log(e);
    }
    return null;
}

// Check if user is authenticated
export async function isAuthenticated(){
    const user = await getCurrentUser();

    return !!user;  // Returns true if user is authenticated, false otherwise
}

// Sign Out function
export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    path: "/",
    expires: new Date(0), // expire immediately
  });

  redirect("/auth/sign-in"); 
}