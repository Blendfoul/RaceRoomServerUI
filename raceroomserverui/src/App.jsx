import React from "react";
import {Container} from "reactstrap";
import {RaceProvider} from "./components/RaceContext";
import HeaderContainer from "./components/HeaderContainer";
import RaceContainer from "./components/RaceContainer";

function App() {
  return (
    <div className="App bg-dark min-vh-100">
        <Container fluid={true}>
            <RaceProvider>
                <HeaderContainer />
                <RaceContainer />
            </RaceProvider>
        </Container>
    </div>
  );
}

export default App;
