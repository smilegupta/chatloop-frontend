import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import ChatArea from "./Components/ChatArea/ChatArea";

function App() {
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
}

export default App;
