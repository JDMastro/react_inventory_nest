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


import { useSelector } from 'react-redux'

const ProtectedRoute = ({ component: Component, ...rest } : any) => {

    const login = useSelector((state : any) => state.AuthReducer.auth)

    return (
        <Route
          { ...rest }
          render={
              (props) => {
                  return login ? <Component { ...props } /> : <Redirect to={
                      {
                          pathname : "/",
                          state : {
                              from : props.location
                          }
                      }
                  }/>
              }
          }
         />
    )
}


export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={App} />
            <ProtectedRoute path="/dashboard" component={Main} />           
            <Route path="*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}

export const DashboardRoute = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/dashboard/" component={()=> <div>Dashboard</div> } />
            <ProtectedRoute exact path="/dashboard/maestro/units" component={Units} />
            <ProtectedRoute exact path="/dashboard/maestro/product" component={Products} />
            {/*<ProtectedRoute exact path="/dashboard/maestro/products/v2" component={ProductV2} />*/}
            <ProtectedRoute exact path="/dashboard/maestro/person" component={Person} />
            <ProtectedRoute exact path="/dashboard/maestro/kindid" component={KindIdentity} />
            <ProtectedRoute exact path="/dashboard/maestro/status" component={Status} />
            <ProtectedRoute exact path="/dashboard/maestro/kindmovements" component={KindMovements} />
            <ProtectedRoute exact path="/dashboard/maestro/conversion" component={Conversion} />
            <ProtectedRoute exact path="/dashboard/inventary/movements" component={Movements} />
            <ProtectedRoute exact path="/dashboard/inventary/consecutive" component={Consecutive} />
            <ProtectedRoute exact path="/dashboard/security/users" component={Users} />
            <ProtectedRoute exact path="/dashboard/inventary/outputs" component={OutPuts} />

            <ProtectedRoute exact path="/dashboard/maestro/productions" component={Production} />

            <ProtectedRoute exact path="/dashboard/maestro/settings" component={Settings} />
            
            <Route exact path="*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}