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
import { SettingStatus } from "../views/settingstatus";
import { Reports } from "../views/reports";

import ProtectedRoute from '../components/private-route';
import { Permission } from "../views/permission";

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
            <ProtectedRoute exact path="/dashboard/" perform="" component={() => <div>Dashboard</div>} />
            <ProtectedRoute path="/dashboard/maestro/units" perform="maestro:units:view" component={Units} />
            <ProtectedRoute path="/dashboard/maestro/product" perform="maestro:products:view" component={Products} />
            {/*<ProtectedRoute exact path="/dashboard/maestro/products/v2" component={ProductV2} />*/}
            <ProtectedRoute path="/dashboard/maestro/person" perform="maestro:providers:view" component={Person} />
            <ProtectedRoute path="/dashboard/maestro/kindid" perform="maestro:kindids:view" component={KindIdentity} />
            <ProtectedRoute path="/dashboard/maestro/status" perform="maestro:status:view" component={Status} />
            <ProtectedRoute path="/dashboard/maestro/kindmovements" perform="maestro:kindmov:view" component={KindMovements} />
            <ProtectedRoute path="/dashboard/maestro/conversion" perform="" component={Conversion} />
            <ProtectedRoute path="/dashboard/inventary/movements" perform="inventario:mov:view" component={Movements} />
            <ProtectedRoute path="/dashboard/inventary/consecutive" perform="maestro:consecutive:view" component={Consecutive} />
            <ProtectedRoute path="/dashboard/security/users" perform="usuarios:accounts:view" component={Users} />
            <ProtectedRoute path="/dashboard/inventary/outputs" perform="consultas:bystatus:view" component={OutPuts} />

            <ProtectedRoute path="/dashboard/inventary/reports" perform="consultas:reports:view" component={Reports} />

            <ProtectedRoute path="/dashboard/maestro/productions" perform="inventario:prod:view" component={Production} />

            <ProtectedRoute exact path="/dashboard/maestro/settings" perform="configuracion:var:view" component={Settings} />
            <ProtectedRoute exact path="/dashboard/maestro/settings/permission" perform="configuracion:permi:view" component={Permission} />
            <ProtectedRoute exact path="/dashboard/maestro/settings/status" perform="configuracion:status:view" component={SettingStatus} />

            <Route path="*" component={() => { return (<div>Page 404</div>) }} />
        </Switch>
    )
}
