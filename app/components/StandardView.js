import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button, Modal, FormGroup, HelpBlock, FormControl, ControlLabel } from 'react-bootstrap';
import DatePicker from'react-dropdowns-datepicker';
import { loadCountryList, getUserData, postCountryData } from '../actions';
import Summary from './Summary';
import { marginFix, paddingFix, formContainer, datePickerContainer } from '../styles/main.scss';

export function getAge(date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

class StandardView extends Component {
    constructor() {
        super();
        this.state = {
            showAgeRestrictionModal: false,
            emailValue: ''
        };
        this.dateChange = this.dateChange.bind(this);
        this.validateCountry = this.validateCountry.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.emailValueChange = this.emailValueChange.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
    }

    componentDidMount() {
        this.props.loadCountryList();
        if (!this.props.userData) {
            this.props.loadUserData();
        }
    }

    dateChange(date) {
        const userAge = getAge(date);
        if (userAge && userAge < 14) {
            this.setState({
                showAgeRestrictionModal: true,
            });
        }
    }

    validateCountry(e) {
        console.log(e);
    }

    onCountryChange(e) {
        return this.props.postCountryData(e.target.value, this.props.userData.id);
    }

    handleCloseModal() {
        this.setState({
            showAgeRestrictionModal: false
        });
    }

    emailValidation() {
        const length = this.state.emailValue.length;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (length === 0 || !re.test(this.state.emailValue)) {
            return 'error';
        }
        return null;
    }
    emailValueChange(e) {
        this.setState({ emailValue: e.target.value });
    }

    render() {
        const { countryList, userData } = this.props;
        return (
            <Row className={`show-grid ${paddingFix}`}>
                <Col md={5} className={marginFix}>
                    <form className={formContainer}>
                        <div className={datePickerContainer}>
                            <ControlLabel>Please select your Date of Birth *</ControlLabel>
                            <DatePicker dateChange={ this.dateChange.bind(this) }  minYear={1960} maxYear={(new Date()).getFullYear()} />
                            { userData && !userData.dateOfBirth ? <p>Please select date of birth </p> : null }
                        </div>
                        <FormGroup controlId="countryDropdown" validationState={this.validateCountry}>
                            <ControlLabel>Please select your Country *</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select country"
                                onChange={this.onCountryChange}>
                                <option>Select your country</option>
                                {
                                    countryList && countryList.map((country) => {
                                        return <option value={country.name} key={country.code}>{country.name}</option>;
                                    })
                                }
                            </FormControl>
                        </FormGroup>
                        <Button type="submit" bsStyle="danger">Submit</Button>
                    </form>
                </Col>
                <Col md={5} className={marginFix}>
                    <Summary />
                </Col>
                <Modal backdrop="static" show={this.state.showAgeRestrictionModal} keyboard={false} enforceFocus onHide={this.handleCloseModal}>
                    <Modal.Header>
                        <Modal.Title>Age Restriction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <p> Age below 14 is not allowed to continue register. Please enter your email address to get parents consent</p>
                            <FormGroup validationState={this.emailValidation()}>
                                <ControlLabel>email *</ControlLabel>
                                <FormControl
                                    type="email"
                                    value={this.state.emailValue}
                                    placeholder="enter your email"
                                    onChange={this.emailValueChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Validation is based on string length.</HelpBlock>
                            </FormGroup>
                            <Button type="submit">Send Email</Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        );
    }
}

StandardView.propTypes = {
    loadCountryList: PropTypes.func,
    loadUserData: PropTypes.func,
    postCountryData: PropTypes.func,
    userData: PropTypes.object,
    countryList: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        countryList: state.countryList,
        userData: state.userData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadCountryList: () => dispatch(loadCountryList()),
        loadUserData: () => dispatch(getUserData()),
        postCountryData: (country, userId) => dispatch(postCountryData(country, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardView);
