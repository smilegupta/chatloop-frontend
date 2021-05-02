import { Avatar, IconButton, Grid } from "@material-ui/core";
import "./ChatArea.css";
import { Fragment, useEffect, useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import { chatroom } from "../../../dummychat";
import chatImage from "../../../Images/chat3.svg";

const ChatArea = (props) => {
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();

  const data = chatroom.find((p) => p.chatRoomId === roomId);

  // Random Seed
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 50));
  }, []);

  return (
    <div className="chat">
      {data ? (
        <Fragment>
          <div className="chat_header">
            <Avatar
              src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`}
            />
            <div className="chat_header_info">
              <h3>{data.name}</h3>
              <p>{data.description}</p>
            </div>
            <div className="chat_header_right">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
          <div className="chat_body">
            <p className="chat_message">
              <span className="chat_name">Srushith Repakula</span>
              <span>
                lacus vel facilisis volutpat est velit egestas dui id ornare
                arcu odio ut sem nulla pharetra diam sit amet nisl suscipit
                adipiscing bibendum est ultricies integer quis auctor elit sed
                vulputate mi sit amet mauris commodo quis imperdiet massa
                tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada
                proin libero nunc{" "}
              </span>
              <span className="chat_timestamp">12:13am</span>
            </p>
            <p className="chat_message chat_reciever">
              <span> Hey </span>
              <br />
              <span className="chat_reciever_timestamp">12:14am</span>
            </p>
          </div>
          <div className="chat_footer">
            <form>
              <input type="text" placeholder="Type a message" />
              <button> Send a message</button>
            </form>
          </div>
        </Fragment>
      ) : (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <img
            alt="Portal Logo"
            src={chatImage}
            align="center"
            style={{ width: "30vw" }}
          />
          <h3 className="chat_no_room_selected">
            Choose a conversation/chatroom to see your chats
          </h3>
        </Grid>
      )}
    </div>
  );
};

export default ChatArea;
