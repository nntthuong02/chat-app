import { Stack } from "@mantine/core";
import "@mantine/core/styles.css";

import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import "./App.scss";
import {
  default as CallVideo,
  default as ToCalled,
} from "./components/CallVideo";
import Header from "./components/Header";
import ReceiverCall from "./components/ReceiverCall";
import ReceiverVideo from "./components/ReceiverVideo";
import Profile from "./components/chat/Profile";
import Setting from "./components/chat/Setting";
import { ListFriend } from "./components/friend/ListFriend";
import { AuthContext } from "./context/Authcontext";
import { CallContextProvider } from "./context/CallContext";
import { GroupContextProvider } from "./context/GroupContext";
import GroupChat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FriendContextProvider from "./context/FriendContext";
function App() {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) return;
    const newSocket = io("http://localhost:8081");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  return (
    <GroupContextProvider user={user} socket={socket}>
      <CallContextProvider user={user} socket={socket}>
        <FriendContextProvider user={user}>
          <Stack style={{ minHeight: "100vh" }}>
            <Header />
            <Routes>
              {" "}
              <Route path="/call" element={user ? <ToCalled /> : <Login />} />
              <Route
                path="/message"
                element={user ? <GroupChat /> : <Login />}
              />
              <Route path="/" element={user ? <GroupChat /> : <Login />} />
              <Route path="/login" element={user ? <GroupChat /> : <Login />} />
              <Route path="/profile" element={user ? <Profile /> : <Login />} />
              <Route path="/setting" element={user ? <Setting /> : <Login />} />
              <Route
                path="/register"
                element={user ? <GroupChat /> : <Register />}
              />
              <Route
                path="/friend"
                element={user ? <ListFriend /> : <Login />}
              ></Route>
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
            <ReceiverCall />
            <CallVideo />
            <ReceiverVideo />
          </Stack>
        </FriendContextProvider>
      </CallContextProvider>
    </GroupContextProvider>
  );
}

export default App;
