import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

import App from "../App";

import { Main } from "../views/main";
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

import ProtectedRoute from '../components/private-route';

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/dashboard" component={Main} />
                <Route path="*" component={() => { return (<div>Page 404</div>) }} />
            </Switch>
        </BrowserRouter>
    )
}

export const DashboardRoute = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/dashboard/" perform="users:view" component={() => <div>Dashboard</div>} />
            <ProtectedRoute path="/dashboard/maestro/units" perform="users:view" component={Units} />
            <ProtectedRoute path="/dashboard/maestro/product" perform="users:view" component={Products} />
            {/*<ProtectedRoute exact path="/dashboard/maestro/products/v2" component={ProductV2} />*/}
            <ProtectedRoute path="/dashboard/maestro/person" perform="users:view" component={Person} />
            <ProtectedRoute path="/dashboard/maestro/kindid" perform="users:view" component={KindIdentity} />
            <ProtectedRoute path="/dashboard/maestro/status" perform="users:view" component={Status} />
            <ProtectedRoute path="/dashboard/maestro/kindmovements" perform="users:view" component={KindMovements} />
            <ProtectedRoute path="/dashboard/maestro/conversion" perform="users:view" component={Conversion} />
            <ProtectedRoute path="/dashboard/inventary/movements" perform="users:view" component={Movements} />
            <ProtectedRoute path="/dashboard/inventary/consecutive" perform="users:view" component={Consecutive} />
            <ProtectedRoute path="/dashboard/security/users" perform="users:view" component={Users} />
            <ProtectedRoute path="/dashboard/inventary/outputs" perform="users:view" component={OutPuts} />

            <ProtectedRoute path="/dashboard/maestro/productions" perform="users:view" component={Production} />

            <ProtectedRoute exact path="/dashboard/maestro/settings" perform="users:view" component={Settings} />
            <ProtectedRoute exact path="/dashboard/maestro/settings/roles" perform="users:view" component={Roles} />
            <ProtectedRoute exact path="/dashboard/maestro/settings/status" perform="users:view" component={SettingStatus} />

            <Route path="*" component={() => { return (<div>Page 404</div>) }} />
        </Switch>
    )
}
