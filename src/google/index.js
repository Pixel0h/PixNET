import firebase from 'firebase/app';

import { auth } from '../firebase';

import { AiFillGoogleSquare } from 'react-icons/ai';

export function GoogleLogin() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <>
            <button className="btn btn-sign-in-google" onClick={signInWithGoogle}><AiFillGoogleSquare /> Sign in with Google</button>
            <p className="disclaimer">Logging in with Google will display the name on your Google Account.</p>
            <p className="guideline">Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )
}