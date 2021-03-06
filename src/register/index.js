import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import { AiOutlineMail } from 'react-icons/ai';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export function Register() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="outlined" color="secondary" className="register" onClick={() => setModalShow(true)}><AiOutlineMail className="registerIcon" /> Register with Email</Button>

            <RegistrationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

function RegistrationModal(props) {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        //err : false,
        //errMsg : ""
    });
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }
    const updateUserProfile = () => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: state.username
        }).then(function () {
            // Update Successful
        }).catch(function (error) {
            // Error happened
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
                    //var errorMessage = error.message;

                    //setState({ err: true, errMsg: errorMessage })
                });
        } else {
            alert('Passwords do not match');
        }
    }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="modalHeader" closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <Form>
                    <Form.Row>
                        <Col xs="{auto}">
                            <Form.Group controlId="username">
                                <TextField
                                    //helperText={state.errMsg}
                                    //error={state.err} 
                                    id="username"
                                    label="Username"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Enter username"
                                    value={state.username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Form.Group controlId="email">
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
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
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    placeholder="Enter password"
                                    value={state.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Form.Group controlId="confirmPassword">
                                <TextField
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    variant="outlined"
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
                <Button className="mr-2" variant="contained" color="primary" type="submit" onClick={handleSubmitClick}>Register</Button>
                <Button variant="outlined" color="primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}