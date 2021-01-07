import React, { useState } from 'react';

import { BiRename } from 'react-icons/bi';

import firebase from '../firebase';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button';

function HandleUsernameChange(props) {
    const [state, setState] = useState ({
        username : ""
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const updateUserProfile = () => {
        var user = firebase.auth().currentUser;

        user?.updateProfile ({
            displayName: state.username
        }).then(function () {
            // Update Successful
        }).catch (function(error) {
            // An error happened
        })
    }
    const handleSubmitClick = (e)  => {
        e.preventDefault();
        
        props.onHide();

        updateUserProfile();
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="modalHeader" closeButton>
                <Modal.Title>Change Username</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <Form>
                    <Form.Row>
                        <Col xs="auto" className="usernameForm">
                            <Form.Group controlId="username">
                                <TextField
                                    id="username"
                                    label="Username"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Enter new username"
                                    value={state.username}
                                    onChange={handleChange}
                                />
                            </Form.Group>                    
                        </Col>
                    </Form.Row>
                </Form>
                <div className="text-center">
                    <small>Usernames are not unique</small>
                </div>
            </Modal.Body>
            <Modal.Footer className="modalFooter">
            <Button className="mr-2" variant="contained" color="primary" type="submit" onClick={handleSubmitClick}>Submit</Button>
                    <Button variant="outlined" color="primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export function ChangeUsername() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="contained" color="primary" className="change-username" onClick={() => setModalShow(true)}>
                <BiRename className="iconChangeUsername" /> Change Username
            </Button>

            <HandleUsernameChange 
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}