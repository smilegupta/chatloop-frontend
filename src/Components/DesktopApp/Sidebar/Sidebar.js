import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SidebarChat from "./SidebarChat";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import CreateGroup from "../CreateGroup";
import JoinGroup from "../JoinGroup";
toast.configure();

const Sidebar = ({ auth }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openJoinGroup, setOpenJoinGroup] = useState(false);

  // Logout Function
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      Auth.signOut();
      auth.setAuthenticated(false);
      auth.setUser(null);
      auth.setConversations(null);
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
    <Fragment>
      {auth.conversations && auth.subscriptionArray ? (
        <div className="sidebar">
          <div className="sidebar_header">
            <Avatar src={auth.conversations.profileImage} />
            <div className="side_header_right">
              <IconButton onClick={() => setOpenJoinGroup(true)}>
                <SearchOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => setOpen(true)}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={(e) => handleLogout(e)}>
                <ExitToAppIcon />
              </IconButton>
            </div>
          </div>
          <div className="sidebar_chats">
            {auth.subscriptionArray.length ? (
              <Fragment>
                {" "}
                {auth.subscriptionArray
                  .sort(
                    (a, b) =>
                      new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
                  )
                  .map((chat, idx) => (
                    <SidebarChat
                      key={idx}
                      chatRoomId={chat.conversationId}
                      name={chat.conversationName}
                      lastMessage={chat.lastMessage}
                      lastMessageAt={chat.lastMessageAt}
                      conversationImage={chat.conversationImage}
                      conversationType={chat.conversationType}
                      description={chat.description}
                      auth={auth}
                      newMessages={chat.newMessages}
                    />
                  ))}
              </Fragment>
            ) : (
              <div className="no_sidebar_chat">
                {" "}
                <span> No chats yet. </span>{" "}
              </div>
            )}
          </div>
          <JoinGroup open={openJoinGroup} setOpen={setOpenJoinGroup} auth={auth} />
          <CreateGroup open={open} setOpen={setOpen} auth={auth} />
        </div>
      ) : (
        <div> Loading </div>
      )}
    </Fragment>
  );
};

export default Sidebar;
