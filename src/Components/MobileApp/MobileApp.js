import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatArea from "./ChatArea/ChatArea";

const MobileApp = () => {
  return (
    <div className="app_desktop">
      <div className="app_desktop_body">
      <Router>
          <Switch>
          <Route path="/" exact>
          <Sidebar />
            </Route>
            <Route path="/rooms/:roomId">
              <ChatArea />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default MobileApp;
