import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import { AiOutlineMail } from 'react-icons/ai';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export function Register() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <button className="btn btn-register" onClick={() => setModalShow(true)}>
                <AiOutlineMail /> Register with Email
            </button>

            <RegistrationModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

function RegistrationModal(props) {
    const [state, setState] = useState ({
        username : "",
        email : "",
        password : "",
        confirmPassword : ""
    });
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    }
    const updateUserProfile = () => {
        var user = firebase.auth().currentUser;
        
        user.updateProfile ({
            displayName: state.username
        }).then(function() {
            // Update Successful
        }).catch (function(error) {
            // An error happened
        });
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();

        if (state.password === state.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
                .then((user) => {
                    updateUserProfile();
                    props.onHide();
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    alert(errorMessage);
                    console.log(errorCode + " : " + errorMessage);
                });
            } else {
                alert('Passwords do not match');
            }
        }
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <Form>
                        <Form.Row className="align-items-center">
                            <Col xs="auto">
                                <Form.Group controlId="username">
                                    <Form.Label srOnly>Username</Form.Label>
                                    <Form.Control 
                                        autoFocus
                                        type="text"
                                        placeholder="Enter username"
                                        value={state.username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <Form.Group controlId="email">
                                    <Form.Label srOnly>Email Address</Form.Label>
                                    <Form.Control 
                                        type="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <Form.Group controlId="password">
                                    <Form.Label srOnly>Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        placeholder="Enter password"
                                        value={state.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <Form.Group controlId="confirmPassword">
                                    <Form.Label srOnly>Confirm Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={state.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modalFooter">
                    <Button type="submit" onClick={handleSubmitClick}>Register</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
}