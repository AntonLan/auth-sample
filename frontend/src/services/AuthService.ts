import {UserPrincipal} from "../model/UserPrincipal";
import axios from "axios";

class AuthService {

    submitLogin = async (user: UserPrincipal): Promise<boolean> => {
        return await axios({
            headers: {
                // 'Authorization': 'Bearer ' + OpenAPI.TOKEN,
                'content-type': 'application/json',
                // 'transaction.id': '123213123'
                // 'Access-Control-Allow-Origin': '*',
            },
            url: "http://localhost:8083/auth",
            method: 'POST',
            responseType: "blob",
            data: {
                username: user.username,
                password: user.password
            },
        }).then(result => {
            return result.data
        })
    }

}

export default new AuthService;
