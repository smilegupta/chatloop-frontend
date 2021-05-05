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

const Login = () => {
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
    <Container disableGutters style={{ margin: "0" }}>
      <Grid
        container
        style={{
          height: "100%",
          width: "100%",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
        }}
      >
        <Grid
          container
          item
          lg={6}
          md={6}
          style={{
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            backgroundColor: "white",
          }}
          className="background2"
        />
        <Grid
          align="center"
          justify="center"
          direction="column"
          container
          item
          lg={6}
          md={6}
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
              align="right"
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
      </Grid>
    </Container>
  );
};

export default Login;
