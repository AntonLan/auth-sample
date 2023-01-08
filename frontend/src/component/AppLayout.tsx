import React from "react";
import {Route, RouteComponentProps, Switch} from "react-router-dom";
import {observer} from "mobx-react";
import Utils, {AppRouter} from "../utils/utils";
import ProtectedRoute from "../route/ProtectedRoute";

class AppLayout extends React.Component<RouteComponentProps> {

    render() {
        return <div>
            <div className="login-form">
                <h1 className="title-login">Sign In to Your Account</h1>
                <input placeholder="Username" type="text" className="input-login"/>
                <input placeholder="Password" type="password" className="input-login"/>
                <button onClick={() => console.log("hello")} className="btn">Login</button>
            </div>
            <Switch>
                {Utils.appRouters
                    .filter((route: AppRouter) => !route.isLayout)
                    .map((route: AppRouter, index: number) => <Route
                        exact
                        key={index}
                        path={route.path}
                        render={() => <ProtectedRoute component={route.component}/>}
                    />)}
            </Switch>
        </div>;
    }
}

export default observer(AppLayout)
