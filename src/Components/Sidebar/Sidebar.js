import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="side_header_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search"></div>
      <div className="sidebar_chats"></div>
    </div>
  );
};

export default Sidebar;
