import { useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
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

const Login = ({auth}) => {
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // eslint-disable-next-line
  const [emailError, setemailError] = useState(false);
  // eslint-disable-next-line
  const [passwordError, setpasswordError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Auth.signIn(email, password);
      let message = "Signed in successfully! Welcome back!!";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      //setLoading(false);
      auth.setAuthenticated(true);
      auth.setUser(res);
      //history.push(`/home`);
    } catch (err) {
      let error = err.message;
      if (err.message === "User is not confirmed.") {
        error =
          "Your account verification not complete. Please complete the verification before logging in.";
      }
      toast.error(error, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  };
}

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
            Sign In
          </Typography>
          <form noValidate autoComplete="false" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              required
              fullWidth
              className={classes.field}
              type="email"
              error={emailError}
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              onChange={(e) => setpassword(e.target.value)}
              label="Password"
              variant="outlined"
              required
              fullWidth
              type="password"
              error={passwordError}
            />
            <Typography
              variant="subtitle2"
              gutterBottom
              align="right"
              className={classes.subtitles}
            >
              Forgot Password?{" "}
              <Link to="/forget-password">
                <span style={{ color: "#5E5470" }} className="cursor-pointer">
                  {" "}
                  Click here{" "}
                </span>
              </Link>
            </Typography>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
            >
              Sign In
            </Button>
          </form>
          <Typography
            variant="subtitle2"
            gutterBottom
            align="left"
            className={classes.subtitles}
          >
            New User?{" "}
            <Link to="/signup">
              <span style={{ color: "#5E5470" }} className="cursor-pointer">
                {" "}
                Register{" "}
              </span>
            </Link>
          </Typography>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
