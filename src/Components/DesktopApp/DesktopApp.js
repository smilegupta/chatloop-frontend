import Sidebar from "./Sidebar/Sidebar";
import ChatArea from "./ChatArea/ChatArea";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./AuthScreens/Signup";
import { Fragment } from "react";
import Login from "./AuthScreens/Login";
import ForgetPassword from "./AuthScreens/ForgetPassword";
import NewPassword from "./AuthScreens/NewPassword";

const DesktopApp = ({ auth }) => {
  console.log(auth);
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
                  <Login />
                </Route>
                <Route path="/signin">
                  <Login />
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
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <ChatArea />
                </Route>
                <Route path="/">
                  <ChatArea />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DesktopApp;
