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
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title && details) {
      console.log(title, details);
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
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
            />

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
            <TextField
              onChange={(e) => setDetails(e.target.value)}
              label="Password"
              variant="outlined"
              required
              fullWidth
              type="password"
              error={detailsError}
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
            Already Have Account?
            <Link to="signin">
              <span style={{ color: "#5E5470" }} className="cursor-pointer">
                Login
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

export default Signup;
