import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";
// import Chat from './Chat';
import db from "./firebase";
import ParticipantChat from "./ParticipantChat";
import { Link, useHistory } from "react-router-dom";

function AddParticipant() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [{ userId }] = useStateValue();
  const [{ participants }] = useStateValue();
  const [{ groupName }] = useStateValue();
  const history = useHistory();
  // const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("users").doc(userId).collection("rooms")
      .where("type", "==", "singleUser")
      .get()
      .then((querySnapshot) => {
        setRooms(
                querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              )
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      console.log(rooms);
    // db.collection("users")
    //   .doc(userId)
    //   .collection("rooms")
    //   .onSnapshot((snapshot) =>
    //     setRooms(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         data: doc.data(),
    //       }))
    //     )
    //   );
  }, [userId]);

  const createGroup = () => {
    db.collection("groups")
      .where("name", "==", groupName)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty === true) {
          let i;
          console.log(participants.length);
          console.log(participants);
          // db.collection("users").onSnapshot(snapshot => console.log(snapshot));
          db.collection("users").doc(userId).collection("rooms").add({
            name: groupName,
            type: "group",
          });
          let k;
          db.collection("groups").add({
            name: groupName,
          });
          db.collection("users")
            .doc(userId)
            .collection("rooms")
            .where("name", "==", groupName)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc2) => {
                console.log(doc2.id, " => ", doc2.data());
                db.collection("users")
                  .doc(userId)
                  .collection("rooms")
                  .doc(doc2.id)
                  .collection("participants")
                  .add({
                    name: user,
                  });
                for (k = 0; k < participants.length; k++) {
                  db.collection("users")
                    .doc(userId)
                    .collection("rooms")
                    .doc(doc2.id)
                    .collection("participants")
                    .add({
                      name: participants[k].name,
                    });
                }
              });
            });
          for (i = 0; i < participants.length; i++) {
            console.log(participants[i].name);
            // console.log(participants[i].data().name)
            db.collection("users")
              .where("name", "==", participants[i].name)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  db.collection("users").doc(doc.id).collection("rooms").add({
                    name: groupName,
                    type: "group",
                  });
                  db.collection("users")
                    .doc(doc.id)
                    .collection("rooms")
                    .where("name", "==", groupName)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((doc1) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc1.id, " => ", doc1.data());
                        for (let j = 0; j < participants.length; j++) {
                          db.collection("users")
                            .doc(doc.id)
                            .collection("rooms")
                            .doc(doc1.id)
                            .collection("participants")
                            .add({
                              name: participants[j].name,
                            });
                        }
                        db.collection("users")
                          .doc(doc.id)
                          .collection("rooms")
                          .doc(doc1.id)
                          .collection("participants")
                          .add({
                            name: user,
                          });
                      });
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
        } else {
          history.push("/addnewchat");
          alert("Please choose anther groupname ");
        }
        querySnapshot.forEach((doc3) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc3.id, " => ", doc3.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  return (
    <Addparticipant>
      <div className="header">
        <p>{groupName}</p>
      </div>
      <div className="header2">
        <p>Click on the Participants to Add Them</p>
      </div>
      <div className="sidebar_chats">
        {rooms.map((room) => (
          <ParticipantChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
      <div className="footer">
        <p>You , </p>
        {participants.map((participant) => (
          <p>{participant.name} , </p>
        ))}
      </div>
      <div className="createGroup">
        <button className="button1" onClick={createGroup}>
          Create Group
        </button>
      </div>
    </Addparticipant>
  );
}

const Addparticipant = styled.div`
  width: 50%;
  margin-left: 25%;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-right: 1px solid lightgray;
    border-bottom: 1px soid black;
    background-color: blue;
    color: white;
  }

  .header2 {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #85a7fa;
    color: white;
  }

  .sidebar_chats {
    flex: 1;
    background-color: #9fe8fa;
    overflow: scroll;
  }
  .footer {
    display: flex;
    flex-direction: row;
    padding: 40px;
    background-color: blue;
    color: white;
  }

  .createGroup {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background-color: rgb(180, 232, 245);
  }
  .button1 {
    height: 40px;
    background-color: #5e5efa;
    color: white;
  }
`;

export default AddParticipant;
