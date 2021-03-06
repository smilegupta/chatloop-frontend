import Sidebar from "./Sidebar/Sidebar";
import ChatArea from "./ChatArea/ChatArea";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./AuthScreens/Signup";
import { Fragment } from "react";
import Login from "./AuthScreens/Login";
import ForgetPassword from "./AuthScreens/ForgetPassword";
import NewPassword from "./AuthScreens/NewPassword";

const DesktopApp = ({ auth }) => {
  return (
    <Fragment>
      {!auth.isAuthenticated ? (
        <div className="login">
          <div className="login_container">
            <Router>
              <Switch>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/" exact>
                  <Login auth={auth} />
                </Route>
                <Route path="/signin">
                  <Login auth={auth} />
                </Route>
                <Route
                  path="/forgot-password/:email"
                  render={(props) => <ForgetPassword {...props} auth={auth} />}
                />
                <Route
                  path="/forgot-password"
                  render={(props) => <ForgetPassword {...props} auth={auth} />}
                />
                <Route
                  path="/new-password/:email"
                  render={(props) => <NewPassword {...props} auth={auth} />}
                />
              </Switch>
            </Router>
          </div>
        </div>
      ) : (
        <div className="app">
          <div className="app_body">
            <Router>
              <Sidebar auth={auth} />
              <Switch>
                <Route
                  path="/rooms/:roomId/:name/:description/:img"
                  render={(props) => <ChatArea {...props} auth={auth} />}
                />
                <Route
                  path="/"
                  exact
                  render={(props) => <ChatArea {...props} auth={auth} />}
                />
              </Switch>
            </Router>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DesktopApp;
