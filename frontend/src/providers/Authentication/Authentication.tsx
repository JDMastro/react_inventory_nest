import React from "react";
import { getCookieToJson  } from '../../utils/cookie';
import { AuthProvider } from './context';
import useUser from '../../hooks/useUser';
import useAuth from "../../hooks/useAuth";

const Authentication : React.FC = ({children}) => {
    const auth = getCookieToJson('iv_at') || null;
    const { findWhere, user: currentUser } = useUser();
    const { login, logout } = useAuth();
    const authProviderValue = {
        isAuthenticated: !!auth,
        user: auth ? currentUser : {},
        login,
        logout,
    };

    React.useEffect(() => {
        if (authProviderValue.isAuthenticated) {
            findWhere();
        }
    }, []);

    return currentUser.loading
        ? (<div>Loading...</div>)
        : (<AuthProvider value={authProviderValue}>{children}</AuthProvider>);
};


export default Authentication;
