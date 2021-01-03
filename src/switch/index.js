import React from 'react';

import { auth } from '../firebase';
import { ChatRoom } from '../chat';
import { GoogleLogin } from '../google';
import { Register } from '../register';
import { Login } from '../login';
import { Logout } from '../logout';

import { useAuthState } from 'react-firebase-hooks/auth'

export default function Switch() {
    const [user] = useAuthState(auth);

    if (user) {
        return (
            <section>
                <Logout />
                <ChatRoom />
            </section>
        );
    } else {
        return (
            <section>
                <Login />
                <Register />
                <GoogleLogin />
            </section>
        )
    }
}