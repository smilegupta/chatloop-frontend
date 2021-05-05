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
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setemailError(false);
    setpasswordError(false);

    if (email === "") {
      setemailError(true);
    }
    if (password === "") {
      setpasswordError(true);
    }
    if (email && password) {
      console.log(email, password);
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
          <form noValidate autoComplete="false" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              required
              fullWidth
              className={classes.field}
              type="text"
              error={emailError}
              onChange={(e) => setemail(e.target.value)}
            />

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
