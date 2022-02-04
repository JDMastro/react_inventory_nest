import { createContext } from 'react';

const context = createContext({
    isAuthenticated: false, // to check if authenticated or not
    user: {}, // store all the user details
    login: () => ({}), // handle Auth0 login process
    logout: () => ({}), // logout the user
});

export const AuthContext = context;
export const AuthProvider = context.Provider;
export const AuthConsumer = context.Consumer;
