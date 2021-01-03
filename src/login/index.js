import React, { Component } from 'react';

import firebase from '../firebase';

import { FiLogIn } from 'react-icons/fi';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export class Login extends Component {
    state = {
        email : "",
        password : ""
    };
    handleChange = (e) => {
        const { id, value } = e.target
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    };
    handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            //Signed in
        })
        .catch((error) => {
            alert(error);
        });
    };
    render() {
        const { email, password } = this.state;
        return (
            <>
                <Form className="sign-in-form">
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Group controlId="email">
                                <Form.Label srOnly>Email Address</Form.Label>
                                <Form.Control 
                                    autoFocus
                                    type="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Form.Group controlId="password">
                                <Form.Label srOnly>Password</Form.Label>
                                <Form.Control 
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
                <Button className="btn-sign-in" type="submit" onClick={this.handleSubmit}><FiLogIn /> Login</Button>
            </>
        )
    }
}