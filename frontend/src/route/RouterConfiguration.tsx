import React from 'react';
import {Route, Switch} from 'react-router-dom';
import utils from "../utils/utils";
import ProtectedRoute from "./ProtectedRoute";

const RouterConfiguration = () => {

    const Login = utils.getRoute('/login').component;
    const AppLayout = utils.getRoute('/').component;

    return (
        <Switch>
            <Route path="/" render={(props) => <AppLayout {...props} />}/>
            <Route path="/login" render={(props) => <Login {...props} />}/>
            <ProtectedRoute path="*" render={(props: any) => <AppLayout {...props} exact/>}/>
        </Switch>

    );
}

export default RouterConfiguration;
