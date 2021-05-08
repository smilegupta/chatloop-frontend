import { useState } from "react";
import { makeStyles, TextField, Button, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { axiosFun } from "../../CRUD/axios.config";
import {
  createChatRoom,
  sendMessage,
  listUserDetails,
} from "../../CRUD/queries";
import { toast } from "react-toastify";
import _ from "lodash";
toast.configure();

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "50vh",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid  #3855aa",
    boxShadow: "-1px 4px 20px -6px rgba(94, 84, 112, 1)",
    padding: "16px 24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "20px",
  },
  field: {
    marginTop: 20,
    display: "block",
  },
}));

export default function CreateGroup({ open, setOpen, auth }) {
  const name = auth.conversations.name;
  const userId = auth.conversations.userId;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [chatName, setChatName] = useState("");
  const [description, setDescription] = useState("");
  let [visited, setVisited] = useState({
    chatName: false,
    description: false,
  });
  let [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Final Validation
  const finalValidate = () => {
    errors = {};

    if (chatName === undefined || chatName === "")
      errors.name = "Please enter group name";

    if (description === undefined || description === "")
      errors.description = "Please enter group description";

    setErrors(errors);

    if (Object.entries(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // Initial Validation
  const doValidate = () => {
    errors = {};

    if ((chatName === undefined || chatName === "") && visited.name)
      errors.name = "Please enter group name";

    if ((description === undefined || description === "") && visited.name)
      errors.description = "Please enter group description";

    setErrors(errors);

    if (Object.entries(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle Visited Fields
  const handleVisited = (e) => {
    let { name } = e.target || e;
    _.set(visited, name, true);
    setVisited({ ...visited });
    doValidate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalValidate()) return;
    setLoading(true);
    try {
      const output = await axiosFun(
        createChatRoom(userId, chatName, description, name)
      );
      const message = "Chat Room Created Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      await axiosFun(
        sendMessage(
          name,
          output.data.createChatRooms.chatRoomId,
          chatName,
          userId,
          output.data.createChatRooms.chatRoomImage,
          "Welcome to the group",
          description,
          "chatRoom"
        )
      );
      const conversation = await axiosFun(listUserDetails(userId));
      auth.setConversations(conversation.data.listUserss.items[0]);
      auth.setSubscriptionArray(
        conversation.data.listUserss.items[0].conversations.items
      );
      setDescription("");
      setChatName("");
      setOpen(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setDescription("");
    setChatName("");
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={() => handleClose()}>
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h5" gutterBottom color="secondary">
            Create Chat Room
          </Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="Name"
              variant="outlined"
              required
              fullWidth
              className={classes.field}
              type="text"
              inputProps={{
                maxLength: 64,
              }}
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              onBlur={handleVisited}
              name="chatName"
            />
            <span className="error_texts">{errors.chatName || ""}</span>

            <TextField
              className={classes.field}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              variant="outlined"
              required
              fullWidth
              type="text"
              multiline
              rows={3}
              inputProps={{
                maxLength: 128,
              }}
              onBlur={handleVisited}
              name="description"
            />
            <span className="error_texts">{errors.description || ""}</span>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
              align="right"
              disabled={loading}
            >
              Create Group
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
