import firebase from 'firebase/app';

import { auth } from '../firebase';

import { AiFillGoogleSquare } from 'react-icons/ai';

import Button from '@material-ui/core/Button';

export function GoogleLogin() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <>
            <Button variant="outlined" color="primary" className="google-login" onClick={signInWithGoogle}><AiFillGoogleSquare className="googleIcon" /> Sign in with Google</Button>
            <p className="disclaimer">Logging in with Google will display the name on your Google Account.</p>
            <p className="guideline">Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )
}