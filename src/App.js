import React from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import GlobalStyles from "./components/GlobalStyles";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Library from "./pages/Library";

function App() {
    return (
        <div className="App">
            <GlobalStyles />
            <Nav />
            <Switch>
                <Route path={["/game/:id", "/"]} exact>
                    <Home />
                </Route>
                <PrivateRoute
                    path={["/library/game/:id", "/library"]}
                    exact
                    component={Library}
                />
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/signup" exact>
                    <SignUp />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
