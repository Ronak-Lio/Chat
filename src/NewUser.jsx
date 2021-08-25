import React, { useEffect, useState } from "react";
import "./NewUser.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import db from "./firebase";
import { Link , useHistory } from "react-router-dom";
import DefaultChat from "./DefaultChat";

function NewUser() {
  const [{ userId }, dispatch] = useStateValue();
  const [{ user }] = useStateValue();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [x, setx] = useState(0);
  const [{ newuser }] = useStateValue();
  const [{ password }] = useStateValue();

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );

    console.log(users);
    

    if (newuser) {
      let i;
      for (i = 0; i < users.length; i++) {
        if (newuser === users[i].name) {
          alert("Please re-enter your name");
          setx(1);
          dispatch({
            type: actionTypes.SET_USER,
            user: null,
          });
        }
      }
    }
      if(x === 0) {
        db.collection("users")
      .where("name", "==", user)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty === true) {
          alert("Please re-enter your name");
          dispatch({
            type: actionTypes.SET_USER,
            user: null,
          });
        }
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          // x++;
          
        
          
          dispatch({
            type: actionTypes.SET_USER_ID,
            userId: doc.id,
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      }
    

    // if(userId)
    // {
    //   ((e) => history.push("/addnewchat"))
    // }
  }, []);
  return (
    <>
      {!userId ? (
        <div className="newuser">
          <div className="newuser_container">
            <h1>Welcome to ChatApp</h1>
          </div>
        </div>
      ) : (
       history.push("/")
      )}
    </>
  );
}

export default NewUser;
