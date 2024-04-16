import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const setUsernames = (username) => {
        setCurrentUser(username);
    };

    const getCurrentUser = () => {
        return currentUser;
    };

    return (
        <UserContext.Provider value={{ setUsernames: setUsernames, getCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
