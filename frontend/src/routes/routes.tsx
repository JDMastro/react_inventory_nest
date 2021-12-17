import { Route, Switch } from 'react-router-dom';

import { Main } from "../views/main";
import App from "../App";
import { Users } from "../views/users";
import { Units } from "../views/units";
import { Products } from "../views/products";
import { Status } from "../views/status";
import { KindIdentity } from "../views/kindidentity";
import { Person } from "../views/person";
import { KindMovements } from "../views/kindmovements";
import { Movements } from "../views/movements";
import { Consecutive } from "../views/consecutive";
import Production from "../views/productions";

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/dashboard" component={Main} />
            <Route path="*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}

export const DashboardRoute = () => {
    return (
        <Switch>
            <Route exact path="/dashboard/" component={()=> <div>Dashboard</div> } />
            <Route exact path="/dashboard/maestro/units" component={Units} />
            <Route exact path="/dashboard/maestro/product" component={Products} />
            <Route exact path="/dashboard/maestro/person" component={Person} />
            <Route exact path="/dashboard/maestro/kindid" component={KindIdentity} />
            <Route exact path="/dashboard/maestro/status" component={Status} />
            <Route exact path="/dashboard/maestro/kindmovements" component={KindMovements} />
            <Route exact path="/dashboard/maestro/productions" component={Production} />
            <Route exact path="/dashboard/inventary/movements" component={Movements} />
            <Route exact path="/dashboard/inventary/consecutive" component={Consecutive} />
            <Route exact path="/dashboard/security/users" component={Users} />

            <Route exact path="*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}
