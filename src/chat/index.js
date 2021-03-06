import React, { useRef, useState } from 'react';

import firebase from 'firebase/app';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, firestore } from '../firebase';

export function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (user) {
            const { uid, photoURL, displayName } = user;

            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                displayName
            });
            setFormValue('');
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            try {

            }
            catch (e) {
                alert(e);
            }
        }
    }
    return (
        <>
            <main className="chatbox">
                {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                <span ref={dummy}></span>
            </main>
            <form className="messageForm" onSubmit={sendMessage}>
                <input className="typeMessage" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here..." />
            </form>
        </>
    )
}

function ChatMessage(props) {
    const { text, uid, photoURL, displayName } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`messages ${messageClass}`}>
            <span className={`username ${messageClass}`}>{displayName}</span>
            <img className="photoURL" src={photoURL || 'https://api.hello-avatar.com/adorables/myseed'} alt={text} />
            <p className="messages">{text}</p>
        </div>
    )
}