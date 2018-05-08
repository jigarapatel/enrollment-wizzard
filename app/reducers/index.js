import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const countryList = (state = '', action) => {
    switch (action.type) {
        case types.GET_COUNTRY_LIST:
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};

const selectedMembership = (state = '', action) => {
    switch(action.type) {
        case types.SET_OPT_IN_TYPE:
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};

const userData = (state = '', action) => {
    switch (action.type) {
        case types.GET_USER_DATA:
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};

const selectedUserCountry = (state = '', action) => {
    switch (action.type) {
        case types.SELECTED_COUNTRY:
            return action.payload ? action.payload.toString() : state;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userData,
    routing,
    countryList,
    selectedUserCountry,
    selectedMembership,
    form: formReducer
});

export default rootReducer;
