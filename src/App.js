import React, {useEffect } from "react";
import "./App.css";
import Username from "./Username";
import { useStateValue } from "./StateProvider";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import NewUser from "./NewUser";
import AddNewChat from "./AddNewChat";
// import "./AddNewChat.css"
import DefaultChat from "./DefaultChat";
import ProfilePhoto from "./ProfilePhoto";
import AddParticipant from "./AddParticipant.jsx";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [{ receiverId }] = useStateValue();
  const [{ userId }] = useStateValue();

  return (
    <div className="app">
      {!userId ? (
        !user ? (
          <Username />
        ) : (
          <NewUser />
        )
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/addnewchat">
                <AddNewChat />
              </Route>
              <Route path="/defaultpage">
               <DefaultChat/>
              </Route>
              <Route path="/rooms/:roomId/:roomName">
                <Chat />
              </Route>
              <Route path="/addProfilePhoto">
               <ProfilePhoto/>
              </Route>
              <Switch>
              <Route path = "/addParticipants" >
                <AddParticipant/> 
              </Route>
              </Switch>
              <Route path="/">
                <DefaultChat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
