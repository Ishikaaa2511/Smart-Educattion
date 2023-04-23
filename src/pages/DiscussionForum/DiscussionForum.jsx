import SendMessage from "../../components/DiscussionForum/SendMessage";
import Navbar2 from "../../components/LayoutComponents/Navbar2/Navbar2";
import Button1 from "../../utils/Buttons/Button1/Button1";
import ChatRoom from "./ChatRoom";
import { Routes, Route } from "react-router-dom/dist";
import { PrivateRoute } from "../../routes/PrivateRoute";

export default function DiscussionForum() {
    return (
        <>
        <Navbar2 />
        <ChatRoom/>
      </>
    )
  }
  