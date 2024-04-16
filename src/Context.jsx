import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to check if user is logged in
    const isLoggedIn = () => {
        return user !== null;
    };

    useEffect(() => {
        // Check if user is stored in localStorage during page refresh
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []); // Run only on component mount

    useEffect(() => {
        // Store user in localStorage when it changes
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]); // Run whenever user state changes

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access context values
export const useUserContext = () => {
    return useContext(UserContext);
};
