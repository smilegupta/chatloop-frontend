import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { chatroom } from "../../../dummychat"

const Sidebar = () => {
  return (
    <div className="mobile_sidebar">
      <div className="mobile_sidebar_header">
        <Avatar />
        <div className="side_header_right">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="mobile_sidebar_search">
        <div className="mobile_sidebar_search_container">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="mobile_sidebar_chats">
      {chatroom.map((chat,idx) => 
          <SidebarChat key={idx} chatRoomId={chat.chatRoomId} name={chat.name} description={chat.description} lastMessage={chat.lastMessage} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
