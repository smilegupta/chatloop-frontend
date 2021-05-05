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
                  <Login auth={auth}/>
                </Route>
                <Route path="/signin">
                  <Login auth={auth}/>
                </Route>
                <Route path="/forget-password">
                  <ForgetPassword />
                </Route>
                <Route path="/new-password">
                  <NewPassword />
                </Route>
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
                  path="/rooms/:roomId"
                  render={(props) => <ChatArea {...props} auth={auth} />}
                />
                <Route
                  path="/"
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
