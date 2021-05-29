import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Routesconf from "./pages/Routesconf";
import { UserContext } from "./context";

const { Login } = Routesconf;

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <UserContext>
            {/*<Route exact path="/" component={() => <div>Hola</div>} />*/}
            <Route exact path="/login" component={Login} />
            <Redirect to="/login" />
          </UserContext>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
