import React from 'react';

import { auth } from '../firebase';
import { Logout } from '../logout';
import { ChangeUsername } from '../username';
import { ChangeAvatar } from '../avatar';

import { useAuthState } from 'react-firebase-hooks/auth'

export default function Hide() {
    const [user] = useAuthState(auth);

    if (user) {
        return (
            <>
                <ChangeAvatar />
                <ChangeUsername />
                <Logout />
            </>
        );
    } else {
        return (
            <>
            </>
        )
    }
}