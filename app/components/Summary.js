import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { summaryContainer, userAttributes, userSummaryLabel } from '../styles/main.scss';

const Summary = ({ userData }) => {
    if (userData && userData !== '') {
        return (
            <div className={summaryContainer}>
                <p className={userSummaryLabel}>User Summary</p>
                <p> ** This is the infomation we have so far **</p>
                <p><span className={userAttributes}>First name</span> : {userData.firstName}</p>
                <p><span className={userAttributes}>Last name</span> : {userData.lastName}</p>
                <p><span className={userAttributes}>Email</span> : {userData.email}</p>
                <p><span className={userAttributes}>User Id</span> : {userData.id}</p>
                {userData.country ?
                <p><span className={userAttributes}>Country</span> : {userData.country}</p> : null
                }
            </div>
        );
    }
    return null;
};

Summary.propTypes = {
    userData: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData
    };
};

export default connect(mapStateToProps)(Summary);
