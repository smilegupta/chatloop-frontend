import Sidebar from "./Sidebar/Sidebar";
import ChatArea from "./ChatArea/ChatArea";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const DesktopApp = () => {
  return (
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
  );
};

export default DesktopApp;
