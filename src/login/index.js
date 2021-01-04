import React, { Component } from 'react';

import firebase from '../firebase';

import { FiLogIn } from 'react-icons/fi';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export class Login extends Component {
    state = {
        email : "",
        password : "",
        err : false,
        errMsg : ""
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
            // User is signed in
        })
        .catch((error) => {
            // Error
            var errorMessage = error.message;

            this.setState({ err: true, errMsg: errorMessage })
        });
    };
    render() {
        const { email, password } = this.state;
        
        return (
            <>
                <Form className="sign-in-form">
                    <Form.Row>
                        <Col xs="auto">
                            <Form.Group controlId="email">
                                <Form.Label srOnly>Email Address</Form.Label>
                                <TextField
                                    helperText={this.state.errMsg}
                                    error={this.state.err}
                                    id="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
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
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined" 
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
                <Button variant="contained" color="primary" className="login" type="submit" onClick={this.handleSubmit}><FiLogIn className="loginIcon" /> Login</Button>
            </>
        )
    }
}