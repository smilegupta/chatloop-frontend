import "./index.css";
import { useState, useEffect, Fragment } from "react";
import DesktopApp from "./Components/DesktopApp/DesktopApp";
import MobileApp from "./Components/MobileApp/MobileApp";
import { Auth } from "aws-amplify";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { axiosFun } from "./CRUD/axios.config";
import { listUserDetails } from "./CRUD/queries";

function App() {
  // State Varaible
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState(null)

  // Props for Session Management
  const authProps = {
    isAuthenticated,
    user,
    setUser,
    setAuthenticated,
    conversations,
    setConversations
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#DE2B64",
      },
      secondary: {
        main: "#5E5470",
      },
    },
  });

  // Checking the device type used by app
  useEffect(() => {
    async function sessionChecker() {
      try {
        await Auth.currentSession();
        setAuthenticated(true);
        const currentUser = await Auth.currentAuthenticatedUser();
        const conversation = await axiosFun(listUserDetails(currentUser.username))
        setConversations(conversation.data.listUserss.items[0])
        setUser(currentUser);
      } catch (err) {
        console.error(err);
      }
      setAuthenticating(false);
    }
    sessionChecker();

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    }
  }, []);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        {isAuthenticating === false && (
          <>
            {" "}
            {!isMobile ? (
              <DesktopApp auth={authProps} />
            ) : (
              <MobileApp auth={authProps} />
            )}{" "}
          </>
        )}
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
