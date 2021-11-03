import React from "react";
import { HashRouter as Router, Switch, Route} from "react-router-dom";

import HomeScreen from "./HomeScreen";
import LoginPage from "./loginPage";
import Project from "./Project";


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/:username" component={HomeScreen} />
                <Route exact path="/" component={LoginPage} /> 
                <Route exact path="/projects/:id" component={Project} />
            </Switch>
        </Router>
    )
}

export default Routes;