import React from "react";
import {Container} from "reactstrap";
import {RaceProvider} from "./components/RaceContext";
import HeaderContainer from "./components/HeaderContainer";
import RaceContainer from "./components/RaceContainer";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import DriverContainer from "./components/DriverContainer";
import RatingContainer from "./components/RatingContainer";

function App() {
  return (
    <div className="App bg-dark min-vh-100">
        <Container fluid={true}>
            <RaceProvider>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HeaderContainer />
                            <RaceContainer />
                        </Route>
                        <Route path="/user/:userName">
                            <DriverContainer />
                        </Route>
                        <Route path="/ratings">
                            <RatingContainer />
                        </Route>
                    </Switch>
                </Router>
            </RaceProvider>
        </Container>
    </div>
  );
}

export default App;
