import { useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
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

const NewPassword = () => {
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [verificationCode, setverificationCode] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.forgotPasswordSubmit(
        params.email,
        verificationCode.trim(),
        password
      );
      toast.success("Password created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push(`/signin`);
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
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Verification Code"
              variant="outlined"
              required
              fullWidth
              className={classes.field}
              type="text"
              onChange={(e) => setverificationCode(e.target.value)}
              value={verificationCode}
            />
            <TextField
              onChange={(e) => setpassword(e.target.value)}
              label="New Password (min 8 chars: lc+uc+sc+num)"
              variant="outlined"
              required
              fullWidth
              type="password"
              className={classes.field}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
            >
              Reset Password
            </Button>
          </form>
          <Typography
            variant="subtitle2"
            gutterBottom
            align="left"
            className={classes.subtitles}
          >
            Try signing in again?{" "}
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

export default NewPassword;
