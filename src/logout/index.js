import { auth } from '../firebase';

import { GoSignOut } from 'react-icons/go';

import Button from 'react-bootstrap/Button';

export function Logout() {
    return auth.currentUser && (
        <Button className="btn btn-sign-out" onClick={() => auth.signOut()}><GoSignOut className="signOutIcon"/> Logout</Button>
    )
}