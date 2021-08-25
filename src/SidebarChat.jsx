import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import AddNewChat from "./AddNewChat";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
  const [{ receiverId }] = useStateValue();
  const [{ user }, dispatch] = useStateValue();
  const [{ userId }] = useStateValue();
  const [rId, setrId] = useState();
  const [{ newreceiverId }] = useStateValue();
  const [enteredName, setEnterdName] = useState();
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [x, setx] = useState(0);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState();

  // const { roomName } = useParams();

  useEffect(() => {
    console.log(name);
    if (name) {
      db.collection("users")
        .where("name", "==", name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setProfilePhotoUrl(doc.data().profilePhotoUrl);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [name] , [profilePhotoUrl]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}/${name}`}>
      <div className="sidebarChat">
        <Avatar src={profilePhotoUrl} />
        {/* <h2>{id}</h2> */}
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          {/* <p>{messages[0]?.message}</p> */}
        </div>
      </div>
    </Link>
  ) : (
    <div
      onClick={(e) => {
        history.push("/addnewchat");
      }}
      className="sidebarChat"
    >
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
