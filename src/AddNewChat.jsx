import React, { useState, useEffect } from "react";
// import "./AddNewChat.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import DefaultChat from "./DefaultChat";
function AddNewChat() {
  const [input, setInput] = useState();
  const [input1, setInput1] = useState();
  const history = useHistory();
  const [{ newreceiverId }, dispatch] = useStateValue();
  const [{ user }] = useStateValue();
  const [{ userId }] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const [x, setx] = useState("0");
  const [{ groupName }] = useStateValue();
  const [chats, setChats] = useState();
  let y = 0;

  const addNewChat = (e) => {
    console.log("Ran");
    e.preventDefault();

    db.collection("users")
      .doc(userId)
      .collection("rooms")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        )
      );

    console.log(rooms);
    // let i;
    // for (i = 0; i < rooms.length; i++) {
    //   if (input === rooms[i].name) {
    //     setx("1");
    //     y =1;
    //     console.log(x);
    //     alert("Please re-enter the UserName");
        // setInput("");
        // history.push("/defaultpage")
    //   }
    // }

    // console.log(x);

    db.collection("users").doc(userId).collection("rooms")
      .where("name", "==", input)
      .get()
      .then((querySnapshot) => {
        if(querySnapshot.empty === true)
        {
          if (input !== "") {
            db.collection("users")
              .where("name", "==", input)
              .get()
              .then((querySnapshot) => {
                console.log(querySnapshot);
                if (querySnapshot.empty === true) {
                  alert("Please re-enter the UserName");
                  setInput("");
                }
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  db.collection("groups")
                    .where("name", "==", input)
                    .get()
                    .then((querySnapshot1) => {
                      if (querySnapshot1.empty === false && y !== 1) {
                        alert("Please re-enter the UserName");
                      } else {
                        dispatch({
                          type: actionTypes.SET_NEWRECEIVER_ID,
                          newreceiverId: doc.id,
                        });
                      }
                      //   querySnapshot.forEach((doc) => {
                      //     // doc.data() is never undefined for query doc snapshots
                      //     console.log(doc.id, " => ", doc.data());
                      //   });
                    })
                    .catch((error) => {
                      console.log("Error getting documents: ", error);
                    });
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
      
            //   if(!newreceiverId) {
            //       alert("Please re-enter the UserName");
            //   }
          }
        }
        else {
          setInput("");
          history.push("/defaultpage");
          alert("Please re-enter the UserName")
        }
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

   
  };

  const addParticipant = () => {
    //   db.collection("cities").where("capital", "==", true)
    // .get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });
    dispatch({
      type: actionTypes.SET_GROUPNAME,
      groupName: input1,
    });
    // db.collection("groups").add({
    //   name : groupName,
    // })
    console.log("GroupName is ", groupName);
    if (groupName) {
      history.push("/addParticipants");
    }
  };

  const changeInput1 = (e) => {
    setInput1(e.target.value);
    dispatch({
      type: actionTypes.SET_GROUPNAME,
      groupName: input1,
    });
  };

  useEffect(
    () => {
      dispatch({
        type: actionTypes.SET_NEWRECEIVER_ID,
        newreceiverId: null,
      });

      db.collection("users")
        .doc(userId)
        .collection("rooms")
        .onSnapshot((snapshot) =>
          setRooms(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
            }))
          )
        );

      console.log(rooms);

      dispatch({
        type: actionTypes.SET_RECEIVER_ID,
        receiverId: newreceiverId,
      });

      if (input !== "") {
        if (newreceiverId) {
          db.collection("users").doc(newreceiverId).collection("rooms").add({
            name: user,
            type: "singleUser",
          });
          db.collection("users").doc(userId).collection("rooms").add({
            name: input,
            type: "singleUser",
          });
        }
      }
    },
    [newreceiverId],
    [input]
  );

  return (
    <>
      {!newreceiverId ? (
        <AddnewChat>
          <Container>
            <form>
              <h2 className="h2">Enter name of the User</h2>
              <input
                value={input}
                type="text"
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn" type="submit" onClick={addNewChat}>
                Add New Chat
              </button>
            </form>
            <h2> Or </h2>
            <form>
              <h2>Create A New Group</h2>
              <input
                placeholder="Enter the Group Name"
                value={input1}
                type="text"
                onChange={changeInput1}
              />
              <button onClick={addParticipant} type="submit">
                Add Participant
              </button>
            </form>
          </Container>
        </AddnewChat>
      ) : (
        history.push("/defaultpage")
      )}
    </>
  );
}

const AddnewChat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Container = styled.div`
  margin-left: 15%;

  margin-right: 15%;
  flex-direction: column;
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  .h2 {
    margin-top: 0px;
    margin-bottom: 10px;
  }

  input {
    height: 30px;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .btn {
    height: 30px;
  }

  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  button {
    height: 30px;
  }
`;

export default AddNewChat;
