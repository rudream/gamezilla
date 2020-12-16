import React from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import GlobalStyles from "./components/GlobalStyles";
import { Switch, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";

function App() {
    const location = useLocation();
    return (
        <div className="App">
            <GlobalStyles />
            <Nav />
            <Switch location={location} key={location.pathname}>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path={["/game/:id", "/"]}>
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
