import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Link,
  HashRouter as Router,
  Switch
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import  {Container, Navbar, Nav} from "react-bootstrap";
import Tasks from "./components/tasks/Tasks";



class App extends React.Component {
  render() {
      return (
        <div>
          <Router>
          <Navbar bg="dark" variant="dark" expand>
              <Navbar.Brand as={Link} to="/">
                Home
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/tasks">
                  Tasks
                </Nav.Link>
              </Nav>
            </Navbar>
            <Container >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/tasks" component={Tasks} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Router>
        </div>
      );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
