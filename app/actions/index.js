import * as types from './types';
import axios from 'axios';

export function getUserData() {
    return (dispatch) => {
        axios.get('http://localhost:3000/user').then(response => {
            dispatch({
                type: types.GET_USER_DATA,
                payload: response.data
            });
        });
    };
}

export function loadCountryList() {
    return (dispatch) => {
        axios.get('http://localhost:3000/countryList').then(response => {
            dispatch({
                type: types.GET_COUNTRY_LIST,
                payload: response.data
            });
        });
    };
}

export function setOptInValue(type) {
    return {
        type: types.SET_OPT_IN_TYPE,
        payload: type
    };
}

function selectedCountry(country) {
    return {
        type: types.SELECTED_COUNTRY,
        payload: country
    };
}

export function postCountryDataSuccess(data) {
    return {
        type: types.POST_COUNTRY_DATA,
        payload: data.country
    };
}

export function postCountryData(country) {
    return (dispatch) => {
        dispatch(selectedCountry(country));
        axios({
            method: 'patch',
            url: 'http://localhost:3000/user',
            headers: { 'Content-Type': 'application/json'},
            data: {
                country: country
            }
        }).then(response => {
            if (response && response.status === 200) {
                dispatch(getUserData()); // after successful PATCH, get users Data
            }
        });
    };
}
