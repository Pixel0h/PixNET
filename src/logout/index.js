import { auth } from '../firebase';

import { GoSignOut } from 'react-icons/go';

import Button from '@material-ui/core/Button';

export function Logout() {
    return auth.currentUser && (
        <Button variant="outlined" color="secondary" className="logout" onClick={() => auth.signOut()}><GoSignOut className="logoutIcon"/> Logout</Button>
    )
}