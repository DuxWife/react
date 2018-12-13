import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router as BaseRouter } from "react-router-dom";

import { history } from "./core/history";
import Layout from "./layout/layout";

ReactDOM.render(
    <BaseRouter history={history}>
        <Layout />
    </BaseRouter>,
    document.getElementById("root")
);
