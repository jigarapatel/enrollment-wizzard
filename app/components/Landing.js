import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
import { getUserData, setOptInValue } from '../actions';
import Summary from './Summary';
import * as styles from '../styles/main.scss';

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'first name is required';
    }
    if (!values.lastName) {
        errors.lastName = 'last name is required';
    }
    if (!values.email) {
        errors.email = 'email is equired';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
};
const cx = classNames.bind(styles);

export const renderField = ({ input, label, type, placeholder, meta: { touched, error, initial }}) => {
    const { name, value, onChange, onBlur } = input;
    return (
        <div className={cx('fieldGroup')}>
            <label>{label}</label>
            <div>
            <input
                name={name}
                type={type}
                className={cx('formTextInput', touched && error ? 'fieldErrors' : undefined)}
                onChange={onChange}
                placeholder={placeholder}
                value={initial ? initial : value}
                onBlur={onBlur}
                onChange={onChange}
            />
            {touched && (error && <p className={cx('inputError')}>{error}</p>)}
            </div>
        </div>
    );
};

class Landing extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.loadUserData();
    }

    handleSubmit(values) {
        console.log('values are : _+_+_+_+_+_+_+_+', values);
    }

    render() {
        const { userData, submitting } = this.props;
        console.log('userDATA is : ', userData);
        return (
            <Row className={cx('show-grid', 'paddingFix')}>
                <Col md={5} className={cx('marginFix')}>
                    <form className={cx('formContainer')} onSubmit={this.handleSubmit}>
                        <Field
                            name="firstName"
                            type="text"
                            component={renderField}
                            label="First Name"
                        />
                        <Field
                            name="lastName"
                            type="text"
                            component={renderField}
                            label="Last Name"
                        />
                        <Field
                            name="email"
                            type="email"
                            component={renderField}
                            label="Email"
                        />
                        <div className={cx('formCheckbox')}>
                            <Field
                                name="Standard"
                                component="input"
                                type="checkbox"
                            />
                            <label htmlFor="standard">&nbsp;Enroll in <span className={cx('membershipType')}>Standard</span> membership</label>
                        </div>
                        <div className={cx('formCheckbox')}>
                            <Field
                                name="Premium"
                                component="input"
                                type="checkbox"
                            />
                            <label htmlFor="premium">&nbsp;Enroll in <span className={cx('membershipType')}>Premium</span> membership</label>
                        </div>
                        <br />
                        <button type="submit" className={cx('btnProps')} disabled={submitting}>Submit</button>
                    </form>
                </Col>
                <Col md={5} className={cx('marginFix')}>
                    <Summary />
                </Col>
            </Row>
        );
    }
}

Landing.propTypes = {
    ...propTypes,
    userData: PropTypes.obj,
    initialValues: PropTypes.obj,
    loadUserData: PropTypes.func,
    form: PropTypes.obj
};

renderField.propTypes = {
    input: PropTypes.objectOf(PropTypes.any).isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.objectOf(PropTypes.any).isRequired,
    label: PropTypes.string,
};

const LandingContainer = reduxForm({
    form: 'landing',
    validate,
    keepDirtyOnReinitialize: true,
    enableReinitialize: false
})(Landing);


const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        initialValues: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: () => dispatch(getUserData()),
        optInSelected: (type) => dispatch(setOptInValue(type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
