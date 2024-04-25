import React, { createContext, useContext, useReducer } from 'react';
import UserViewObject from "./UserViewObject";

// Define the function to parse user data from localStorage to UserViewObject
const parseUser = (userData) => {
    if (userData) {
        return new UserViewObject(
            userData.username,
            userData.userId,
            userData.accessKey,
            userData.companyNumber,
            userData.is_change_company_code
        );
    } else {
        return null;
    }
};

// Define the initial state
const initialState = {
    user: parseUser(JSON.parse(localStorage.getItem('user'))) || null
};

// Create context
const UserContext = createContext();

// Define the reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

// Create provider component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Function to check if user is logged in
    const isLoggedIn = () => {
        return state.user !== null;
    };

    return (
        <UserContext.Provider value={{ state, dispatch, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access context values
export const useUserContext = () => {
    return useContext(UserContext);
};
export default UserContext;