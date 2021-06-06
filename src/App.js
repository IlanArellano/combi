import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routesconf from "./pages/Routesconf";
import { UserContext } from "./context";
import UserLogged from "./components/logged";

const { Login, Home } = Routesconf;

function App() {
  return (
    <div>
      <UserContext>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <UserLogged>
              <Route exact path="/home" component={Home} />
            </UserLogged>
          </Switch>
        </Router>
      </UserContext>
    </div>
  );
}

export default App;
