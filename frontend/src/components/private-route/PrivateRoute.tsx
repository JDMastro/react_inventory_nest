
import { Redirect, Route } from "react-router-dom";
import useAuthentication from "../../providers/Authentication/useAuthentication";
import { check } from '../../utils/auth';

const ProtectedRoute = ({ component: Component, perform, ...rest }: any) => {
    const { isAuthenticated, user }: any = useAuthentication();
    const isAuthorized = check(user.data, perform);
    // isAuthenticated && isAuthorized  -> page
    // isAuthenticated && !isAuthorized -> No Authorized
    // !isAuthenticated -> login
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    return isAuthenticated && isAuthorized
                        ? <Component {...props} />
                        : <Redirect to={
                            {
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                }
            }
        />
    )
}

export default ProtectedRoute;
