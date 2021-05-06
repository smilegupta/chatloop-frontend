import { useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import { axiosFun } from "../../../CRUD/axios.config";
import { createUser } from "../../../CRUD/queries";
toast.configure();

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  subtitles: {
    marginTop: 5,
    marginBottom: 5,
    display: "block",
  },
});

const Signup = () => {
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const profileImage = `https://avatars.dicebear.com/api/bottts/${Math.floor(
    Math.random() * 5000
  )}.svg`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Auth.signUp({
        username,
        password,
        attributes: {
          name: name,
          picture: profileImage,
        },
      });
      console.log(res);
      let output = await axiosFun(createUser(res.userSub, name, profileImage));
      console.log(output);
      let message =
        "Verification email successfully. Please verify your account by clicking that link before logging in.";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push(`/signin`);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="mobile_login_container">
      <Container disableGutters style={{ margin: "0", height: "100vh" }}>
        <Grid
          align="center"
          justify="center"
          direction="column"
          container
          item
          xs={12}
          sm={12}
          style={{
            height: "100%",
            width: "100%",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            textAlign: "left",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5" gutterBottom color="secondary">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              required
              fullWidth
              className={classes.field}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Email"
              variant="outlined"
              required
              fullWidth
              className={classes.field}
              type="email"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <TextField
              onChange={(e) => setpassword(e.target.value)}
              label="Password"
              variant="outlined"
              required
              fullWidth
              type="password"
              value={password}
              className={classes.field}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
            >
              Sign Up
            </Button>
          </form>
          <Typography
            variant="subtitle2"
            gutterBottom
            align="left"
            className={classes.subtitles}
          >
            Already Have Account?{" "}
            <Link to="/signin">
              <span style={{ color: "#5E5470" }} className="cursor-pointer">
                {" "}
                Sign In{" "}
              </span>
            </Link>
          </Typography>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
