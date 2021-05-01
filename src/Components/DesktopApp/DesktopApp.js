import Sidebar from "./Sidebar/Sidebar";
import ChatArea from "./ChatArea/ChatArea";

const DesktopApp = () => {
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default DesktopApp;
