import Sidebar from "./Sidebar/Sidebar";
import ChatArea from "./ChatArea/ChatArea";

const DesktopApp = () => {
  return (
    <div className="app_desktop">
      <div className="app_desktop_body">
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default DesktopApp;
