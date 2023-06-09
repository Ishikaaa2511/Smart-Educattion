import { useState } from "react";
import { createPortal } from "react-dom";

import Navbar from "../../components/LayoutComponents/Navbar1/Navbar";
import LoggedInNavbar from "../../components/LayoutComponents/LoggedInNavbar/LoggedInNavbar";
import Footer from "../../components/LayoutComponents/Footer/Footer";
import LoginModal from "../../components/Auth/LoginModal/LoginModal";
import { UserContext } from "../pages/Signup";

const Layout1 = ({ modal = false, setModal = () => {}, children }) => {
  const [auth, setAuth] = useState(true);
  let comp = <Navbar />;

  if (auth) {
    comp = <LoggedInNavbar />;
  }

  return (
    <>
      {modal
        ? createPortal(
            <LoginModal setModal={setModal} />,
            document.getElementById("modal")
          )
        : ""}
      <UserContext.Provider value={{ username: "John", photoURL: "" }}>
        {comp}
      </UserContext.Provider>
      {children}
      <Footer />
    </>
  );
};

export default Layout1;
