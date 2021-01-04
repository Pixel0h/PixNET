import React, { useState } from 'react';

import { storage } from "../firebase";

import firebase from 'firebase/app';
import 'firebase/auth';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from '@material-ui/core/Button';

import { BsPersonBoundingBox } from 'react-icons/bs';

export function ChangeAvatar() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button 
            variant="contained" 
            color="primary" 
            className="changeAvatar" 
            onClick={() => setModalShow(true)}>
                <BsPersonBoundingBox className="iconChangeAvatar" /> Change Avatar
            </Button>

            <ChangeAvatarModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

function ChangeAvatarModal(props) {
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleUpload(e) {
        e.preventDefault();
        
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
                setFile(null)
                setURL(url);
                updateUserProfile();
            });
        });
    }
    const updateUserProfile = () => {
        var user = firebase.auth().currentUser;

        user.updateProfile ({
            photoURL: url
        }).then(function() {
            // Successful update
        }).catch(function(error) {
            // An error happened
        })
    }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="modalHeader" closeButton>
                <Modal.Title>Change Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <Form>
                    <Form.Row>
                        <Col xs="auto">
                            <Form.Group controlId="file">
                                <Form.Label srOnly>Upload Avatar</Form.Label>
                                <Form.File
                                    id="custom-file"
                                    label="Upload Avatar"
                                    onChange={handleChange}
                                    custom
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row className="text-center">
                        <Col xs="auto">
                            <img className="imagePrev" src={url} alt="" />
                            <small>Avatars will be resized to 50x50</small>
                        </Col>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modalFooter">
                <Button className="mr-2" variant="contained" color="primary" type="submit" onClick={handleUpload} disabled={!file}>Upload</Button>
                <Button variant="outlined" color="primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}