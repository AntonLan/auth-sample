import AuthenticationStore from "./AuthenticationStore";


export default function initializeStores() {
    return {
        authenticationStore: new AuthenticationStore(),
    };
}
