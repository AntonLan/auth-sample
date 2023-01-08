import React, {BaseSyntheticEvent} from "react";
import AuthenticationStore from "../store/AuthenticationStore";
import {inject, observer} from "mobx-react";
import InjectNames from "../store/storeIdentifier";
import {RouteComponentProps} from "react-router-dom";

interface IProps extends RouteComponentProps{
    authenticationStore: AuthenticationStore
}

class Login extends React.Component<IProps>{

    onInputUserName = (event:BaseSyntheticEvent) => {
        const e = event?.nativeEvent as InputEvent;
        if (e.data !== null) {
            this.props.authenticationStore.changeUserName(e.data);
        }

    }

    onInputPassword = (event:BaseSyntheticEvent) => {
        const e = event?.nativeEvent as InputEvent;
        if (e.data !== null) {
            this.props.authenticationStore.changeUserPassword(e.data);
        }
    }

    submitLogin =() => {
        this.props.authenticationStore.submitLogin();
    }

    render() {
        return <div className="login-form">
            <h1 className="title-login">Sign In to Your Account</h1>
            <input placeholder="Username" type="text" className="input-login" onInput={this.onInputUserName}/>
            <input placeholder="Password" type="password" className="input-login" onInput={this.onInputPassword}/>
            <button onClick={this.submitLogin} className="btn">Login</button>
            <div>{this.props.authenticationStore.result!.toString()}</div>
        </div>;
    }
}

export default inject(InjectNames.AuthenticationStore)(observer(Login));
