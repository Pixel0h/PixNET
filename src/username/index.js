import React, { useState } from 'react';

import { BsFillPersonFill } from 'react-icons/bs';

import firebase from '../firebase';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

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
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Group controlId="username">
                                <Form.Label srOnly>New Username</Form.Label>
                                <Form.Control 
                                    autoFocus
                                    type="text"
                                    placeholder="Enter new username"
                                    value={state.username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modalFooter">
                <Button type="submit" onClick={handleSubmitClick}>Submit</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export function ChangeUsername() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button className="btn btn-change-username" onClick={() => setModalShow(true)}>
                <BsFillPersonFill className="iconChangeUsername" /> Change Username
            </Button>

            <HandleUsernameChange 
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}