import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SidebarChat from "./SidebarChat";
import { chatroom } from "../../../dummychat"
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();
// import {useEffect} from "react"
// import { axiosFun } from "../../../CRUD/axios.config"
// import {listAllChatRooms} from "../../../CRUD/queries"

const Sidebar = ({auth}) => {
  const history = useHistory();
  // useEffect( async () => {
  //   const res = await axiosFun(listAllChatRooms)
  //   console.log(res)
      
  // }, []);

  // Logout Function
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      Auth.signOut();
      auth.setAuthenticated(false);
      auth.setUser(null);
      let message = "Logged Out Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://avatars.dicebear.com/api/bottts/67.svg" />
        <div className="side_header_right">
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <ExitToAppIcon onClick={(e) => handleLogout(e)} />
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
