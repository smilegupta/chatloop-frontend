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
toast.configure();

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    display: "block",
  },
  subtitles: {
    marginTop: 5,
    marginBottom: 5,
    display: "block",
  },
});

const Login = ({ auth }) => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [resendEmail, setResendEmail] = useState(false);
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
      history.push(`/`);
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
      if (err.message === "User is not confirmed.") setResendEmail(true);
    }
  };

  // Resend Confirmation Link
  const resendConfirmationLink = async (e) => {
    e.preventDefault();
    try {
      await Auth.resendSignUp(email);
      toast.success(
        "Verification email resent successfully. Please verify your account by clicking that link before logging in.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setResendEmail(false);
    } catch (err) {
      let error = err.message || "Something went wrong!";
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
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
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              value={email}
              label="Email"
              variant="outlined"
              required
              fullWidth
              className={classes.field}
              type="email"
              error={emailError}
              onChange={(e) => setemail(e.target.value)}
            />
            {resendEmail && (
              <Typography
                variant="subtitle2"
                gutterBottom
                align="right"
                className={`cursor-pointer ${classes.subtitles}`}
                style={{ color: "#5E5470" }}
              >
                <span onClick={(e) => resendConfirmationLink(e)}> Missed Confirmation Link?</span>
              </Typography>
            )}
            <TextField
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              label="Password"
              variant="outlined"
              required
              fullWidth
              type="password"
              error={passwordError}
              className={classes.field}
            />
            <Typography
              variant="subtitle2"
              gutterBottom
              align="right"
              className={classes.subtitles}
            >
              Forgot Password?{" "}
              <Link to={`/forgot-password/${email}`}>
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
