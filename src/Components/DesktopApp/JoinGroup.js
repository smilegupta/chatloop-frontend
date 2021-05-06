import { useState } from "react";
import { makeStyles, Typography, Tabs, Tab } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
// import { axiosFun } from "../../CRUD/axios.config";
// import { createChatRoom, sendMessage, listUserDetails } from "../../CRUD/queries";
import { toast } from "react-toastify";
toast.configure();

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    height: "70vh",
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
}));

export default function JoinGroup({ open, setOpen, auth }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [value, setValue] = useState(2);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Modal open={open} onClose={() => handleClose()}>
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="h5" gutterBottom color="secondary">
            Explore Rooms/Users
          </Typography>
          <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label="Rooms" />
        <Tab label="Groups" />
      </Tabs>
    </>
        </div>
      </Modal>
    </div>
  );
}
