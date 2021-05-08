import React, { useState, Fragment, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Modal,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import {
  listAllChatRooms,
  getLastMessage,
  joinChatRoom,
  listUserDetails,
} from "../../CRUD/queries";
import { axiosFun } from "../../CRUD/axios.config";
import { toast } from "react-toastify";
toast.configure();

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    height: "70vh",
    overflow: "scroll"
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid  #3855aa",
    boxShadow: "-1px 4px 20px -6px rgba(94, 84, 112, 1)",
    padding: "32px",
    borderRadius: "20px",
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function JoinGroup({ open, setOpen, auth }) {
  
  const classes = useStyles();
  const [chatRoomList, setChatRoomList] = useState(null);
  const [modalStyle] = useState(getModalStyle);

  console.log(auth.conversations.conversations.items)
  console.log(chatRoomList)
  
  useEffect(() => {
    async function fetchData() {
      const response = await axiosFun(listAllChatRooms);
      setChatRoomList(response.data.listChatRoomss.items);
    }
    fetchData();
  }, [open]);
  
  const newListMaker = () => {
      const userChatRoomIds = auth.conversations.conversations.items.map(conversation => conversation.conversationId);
      return chatRoomList.filter(room => !(userChatRoomIds.includes(room.chatRoomId)))
  }

  const joinGroupFun = async (
    chatRoomId,
    chatRoomImage,
    chatRoomName,
    chatDescription
  ) => {
    try {
      const res = await axiosFun(getLastMessage(chatRoomId));
      await axiosFun(
        joinChatRoom(
          chatRoomId,
          chatRoomImage,
          chatRoomName,
          "chatRoom",
          res.data.listMessagess.items[0].message,
          res.data.listMessagess.items[0].sentAt,
          auth.conversations.userId,
          chatDescription
        )
      );
      const message = "Chat Room Joined Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      const conversation = await axiosFun(
        listUserDetails(auth.conversations.userId)
      );
      auth.setConversations(conversation.data.listUserss.items[0]);
      auth.setSubscriptionArray(
        conversation.data.listUserss.items[0].conversations.items
      );
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={() => handleClose()}>
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h5" gutterBottom color="secondary">
            Explore Rooms
          </Typography>
          <List className={classes.root}>
            {chatRoomList && newListMaker().length ? (<Fragment>
              {
                newListMaker().map((list, idx) => (
                  <Fragment key={idx}>
                    <ListItem
                      alignItems="flex-start"
                      onClick={() =>
                        joinGroupFun(
                          list.chatRoomId,
                          list.chatRoomImage,
                          list.name,
                          list.description
                        )
                      }
                      className="cursor-pointer"
                    >
                      <ListItemAvatar>
                        <Avatar alt={list.name} src={list.chatRoomImage} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={list.name}
                        secondary={<Fragment>{list.description}</Fragment>}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Fragment>
                ))
              }
            </Fragment>) : (<Fragment>
             <div>
             <span style={{display:"block", textAlign:"center"}}> You are already a part of all the available groups! Great going. </span> 
             </div>
            </Fragment>)}
          </List>
        </div>
      </Modal>
    </div>
  );
}
