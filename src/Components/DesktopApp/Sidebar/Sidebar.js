import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { chatroom } from "../../../dummychat"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://avatars.dicebear.com/api/human/6.svg" />
        <div className="side_header_right">
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_search_container">
          <input placeholder="Search Conversations" type="text" />
          <SearchOutlinedIcon />
        </div>
      </div>
      <div className="sidebar_chats">
        {chatroom.map((chat,idx) => 
          <SidebarChat key={idx} chatRoomId={chat.chatRoomId} name={chat.name} description={chat.description} lastMessage={chat.lastMessage} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
