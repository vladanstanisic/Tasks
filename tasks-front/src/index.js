import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import  {Container} from "react-bootstrap";


class App extends React.Component {
  render() {
      return (
        <div>
          <Router>
            <Container>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Router>
        </div>
      );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
