import { Route, Switch, Redirect } from 'react-router-dom';

import { Main } from "../views/main";
import App from "../App";
import { Users } from "../views/users";
import { Units } from "../views/units";
import { Products } from "../views/products";
//import ProductV2 from "../views/products/v2";
import { Status } from "../views/status";
import { KindIdentity } from "../views/kindidentity";
import { Person } from "../views/person";
import { KindMovements } from "../views/kindmovements";
import { Movements } from "../views/movements";
import { Consecutive } from "../views/consecutive";
import Production from "../views/productions";

import { Conversion } from "../views/conversion";
import { OutPuts } from "../views/outputs";
import { Settings } from "../views/settings";
import { Roles } from "../views/roles";

import { SettingStatus } from "../views/settingstatus";


import { useSelector } from 'react-redux'

import { BrowserRouter } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {

    const login = useSelector((state: any) => state.AuthReducer.auth)

    return (
        <Route
            {...rest}
            render={
                (props) => {
                    return login ? <Component {...props} /> : <Redirect to={
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


export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <ProtectedRoute path="/dashboard" component={Main} />
                <Route path="*" component={() => { return (<div>Page 404</div>) }} />
            </Switch>
        </BrowserRouter>
    )
}

export const DashboardRoute = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/dashboard/" component={() => <div>Dashboard</div>} />
            <ProtectedRoute path="/dashboard/maestro/units" component={Units} />
            <ProtectedRoute path="/dashboard/maestro/product" component={Products} />
            {/*<ProtectedRoute exact path="/dashboard/maestro/products/v2" component={ProductV2} />*/}
            <ProtectedRoute path="/dashboard/maestro/person" component={Person} />
            <ProtectedRoute path="/dashboard/maestro/kindid" component={KindIdentity} />
            <ProtectedRoute path="/dashboard/maestro/status" component={Status} />
            <ProtectedRoute path="/dashboard/maestro/kindmovements" component={KindMovements} />
            <ProtectedRoute path="/dashboard/maestro/conversion" component={Conversion} />
            <ProtectedRoute path="/dashboard/inventary/movements" component={Movements} />
            <ProtectedRoute path="/dashboard/inventary/consecutive" component={Consecutive} />
            <ProtectedRoute path="/dashboard/security/users" component={Users} />
            <ProtectedRoute path="/dashboard/inventary/outputs" component={OutPuts} />

            <ProtectedRoute path="/dashboard/maestro/productions" component={Production} />

            <ProtectedRoute exact path="/dashboard/maestro/settings" component={Settings} />
            <ProtectedRoute exact path="/dashboard/maestro/settings/roles" component={Roles} />
            <ProtectedRoute exact path="/dashboard/maestro/settings/status" component={SettingStatus} />

            <Route path="*" component={() => { return (<div>Page 404</div>) }} />
        </Switch>
    )
}