import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  MoreVert,
  AttachFile,
  InsertEmoticon,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import { actionTypes } from "./reducer";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [{ userId }] = useStateValue();
  const [{ receiverId }] = useStateValue();
  const [{ receiver }] = useStateValue();
  const [{ roomidr }] = useStateValue();
  const [type, setType] = useState();
  const [participants, setParticipants] = useState([]);
  const [group, setGroup] = useState(0);
  const [participantIds, setParticipantIds] = useState([]);
  const [x, setX] = useState(0);
  const [ids, setIds] = useState([]);
  const[profilePhotoUrl , setProfilePhotoUrl] = useState();


  useEffect(
    () => {
      {
        console.log(roomId);
      }
      if (roomId) {
     db.collection("users").where("name", "==", roomName)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setProfilePhotoUrl(doc.data().profilePhotoUrl)

        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
        console.log("Your room Id is ", roomId);
        console.log("Your userId is ", userId);

        dispatch({
          type: actionTypes.SET_RECEIVER,
          receiver: roomName,
        });
        db.collection("users")
          .doc(userId)
          .collection("rooms")
          .doc(roomId)
          .collection("participants")
          .onSnapshot((snapshot) =>
            setParticipants(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );
        console.log(participants);

        db.collection("users")
          .where("name", "==", roomName)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              dispatch({
                type: actionTypes.SET_RECEIVER_ID,
                receiverId: doc.id,
              });
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

        db.collection("users")
          .doc(userId)
          .collection("rooms")
          .doc(roomId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          );

        console.log(receiverId);
      }
    },
    [roomId],
    [group],
    [receiverId],
    [participants.length]
  );

  


  const ChangeInput = (e) => {
    setInput(e.target.value);
    console.log(participants);
    console.log("ChangeInput");

    if (participants.length === 0) {
      db.collection("users")
        .doc(receiverId)
        .collection("rooms")
        .where("name", "==", user)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            dispatch({
              type: actionTypes.SET_ROOM_IDR,
              roomidr: doc.id,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>> ", input);
    if (participants.length === 0) {
      db.collection("users")
        .doc(userId)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          message: input,
          name: user,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      console.log(" Reciever id is", receiverId);

      console.log("Room Id for Reciever is", roomidr);

      db.collection("users")
        .doc(receiverId)
        .collection("rooms")
        .doc(roomidr)
        .collection("messages")
        .add({
          message: input,
          name: user,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setInput("");
    }

    if (participants.length > 0) {
      setX(1);

      let i;
      for (i = 0; i < participants.length; i++) {
        db.collection("users")
          .where("name", "==", participants[i].data.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc1) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc1.id, " => ", doc1.data());
              dispatch({
                type: actionTypes.SET_RECEIVER_ID,
                receiverId: doc1.id,
              });
              db.collection("users")
                .doc(doc1.id)
                .collection("rooms")
                .where("name", "==", roomName)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    dispatch({
                      type: actionTypes.SET_ROOM_IDR,
                      roomidr: doc.id,
                    });

                    console.log(
                      "For setting RoomIDR,  receiver ID is ",
                      doc1.id
                    );

                    db.collection("users")
                      .doc(doc1.id)
                      .collection("rooms")
                      .doc(doc.id)
                      .collection("messages")
                      .add({
                        message: input,
                        name: user,
                        timestamp:
                          firebase.firestore.FieldValue.serverTimestamp(),
                      });
                  });

                  console.log("RAN");
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }

      setInput("");
    }
  };

  return (
    <div className="chat">
      {/* {console.log(roomName)} */}

      <div className="chat_header">
       {participants.length === 0?(
          <Avatar src = {profilePhotoUrl} />
       ):(
        <Avatar/>
       )}
        <div className="chat_headerInfo">
          {/* {roomName.filter()} */}
          <h3>{roomName}</h3>
          <p>
            last seen {""}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={ChangeInput}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
