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

const ForgetPassword = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);

    if (title === "") {
      setTitleError(true);
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
          align="center"
          justify="center"
          direction="column"
          container
          lg="6"
          md="6"
          style={{
            height: "100%",
            width: "100%",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            textAlign: "left",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5" color="primary">
            Reset Password
          </Typography>
          <Typography variant="subtitle2" gutterBottom color="secondary">
            Enter the email address associated with your account
          </Typography>
          <form noValidate autoComplete="false" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              required
              fullWidth
              className={classes.field}
              type="email"
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
            >
              Send Code
            </Button>
          </form>
          <Typography
            variant="subtitle2"
            gutterBottom
            align="left"
            className={classes.subtitles}
          >
            Try signing in again?
            <Link to="signin">
              <span style={{ color: "#5E5470" }} className="cursor-pointer">
                {" "}
                Sign In
              </span>
            </Link>
          </Typography>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          style={{
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            backgroundColor: "white",
          }}
          className="background2"
        />
      </Grid>
    </Container>
  );
};

export default ForgetPassword;
