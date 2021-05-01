import "./index.css";
import { useState, useEffect, Fragment } from "react";
import DesktopApp from "./Components/DesktopApp/DesktopApp";
import MobileApp from "./Components/MobileApp/MobileApp";

function App() {
  // State Varaible
  const [isMobile, setIsMobile] = useState(false);

  // Checking the device type used by app
  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
    {
      setIsMobile(true);
    }
  }, []);

  return <Fragment>{!isMobile ? <DesktopApp /> : <MobileApp />}</Fragment>;
}

export default App;
