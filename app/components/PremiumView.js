import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Summary from './Summary';
import { marginFix, paddingFix, formContainer } from '../styles/main.scss';

class StandardView extends Component {
    render() {
        return (
            <Row className={`show-grid ${paddingFix}`}>
                <Col md={5} className={marginFix}>
                    <form className={formContainer}>
                        <FormGroup>
                            <ControlLabel>Date of Birth *</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="enter your date of birth"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Country *</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="enter your Country"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>email *</ControlLabel>
                            <FormControl
                                type="email"
                                placeholder="enter your email"
                            />
                        </FormGroup>
                        <Button type="submit" bsStyle="danger">Submit</Button>
                    </form>
                </Col>
                <Col md={5} className={marginFix}>
                    <Summary />
                </Col>
            </Row>
        );
    }
}

export default StandardView;
