import React from "react";
import {createRoot} from "react-dom/client";
import App from './App';
import initializeStores from "./store/storeInitializer";
import {createBrowserHistory} from "history";
import {Router} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {Provider} from "mobx-react";

const stores = initializeStores();
const history = createBrowserHistory({basename: ((window as any).$Env as any).path}!);
const root = createRoot(document.getElementById("root") as Element);

root.render(
    <Provider {...stores}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
);

reportWebVitals();
