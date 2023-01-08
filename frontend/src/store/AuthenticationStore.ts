import {UserPrincipal} from "../model/UserPrincipal";
import {action, makeObservable, observable} from "mobx";
import AuthService from "../services/AuthService";

class AuthenticationStore {

    user: UserPrincipal = {
        username: "",
        password: ""
    }

    result?: boolean = false;

    constructor() {
        makeObservable(this, {
            user: observable,
            result: observable,
            changeUserName: action,
            changeUserPassword: action,
            submitLogin: action
        })
    }

    changeUserName = (deltaName: string) => {
        this.user.username = this.user.username + deltaName
    }

    changeUserPassword = (deltaPassword: string) => {
        this.user.password = this.user.password + deltaPassword
    }


    submitLogin = () => {
        this.result = false
        AuthService.submitLogin(this.user).then(result => {
            console.log(result)
            this.result = result
        })
    }
}

export default AuthenticationStore;
