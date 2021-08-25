import React, { useState, useEffect } from "react";
import db from "./firebase";
import "./Username.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Link, useHistory } from "react-router-dom";

function Username() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [{ userId }] = useStateValue();
  const [uID, setuID] = useState();
  const [users, setUsers] = useState([]);
  const [x, setx] = useState(0);
  const [input3, setInput3] = useState();
  const [input4, setInput4] = useState();
  const history = useHistory();
  const[profileImage , setProfileImage] = useState("");

  const changeInput = (e) => {
    setInput1(e.target.value);
  };

  // let x=0;
  const createuser = (e) => {
    e.preventDefault();
    db.collection("users").where("name", "==", input1)
    .get()
    .then((querySnapshot) => {
      if(querySnapshot.empty === true)
      {
        dispatch({
          type: actionTypes.SET_NEW_USER,
          newuser: input1,
        });
        dispatch({
          type: actionTypes.SET_USER,
          user: input1,
        });
    
        dispatch({
          type: actionTypes.SET_PASSWORD,
          password: input3,
        });
        db.collection("users").add({
          name: input1,
          password: input3,
        });
    
      }
      else
      {
        alert("Please set another  UserName ,  this userName is already in use")
      }
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    // dispatch({
    //   type: actionTypes.SET_NEW_USER,
    //   newuser: input1,
    // });

    // dispatch({
    //   type: actionTypes.SET_PASSWORD,
    //   password: input3,
    // });

    db.collection("users").onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );

    console.log(users);

    // let i;
    // for (i = 0; i < users.length; i++) {
    //   if (input1 === users[i].name) {
    //     alert("Please re-enter your name");
    //     setx(1);
    //     dispatch({
    //       type: actionTypes.SET_USER,
    //       user: null,
    //     });
    //     setInput1("");
    //   }
    // }

    // if (x === 0) {
    //   db.collection("users").add({
    //     name: input1,
    //     password: input3,
    //   });

      // dispatch({
      //   type: actionTypes.SET_USER,
      //   user: input1,
      // });
    // }
  };

  const signIn = (e) => {
    e.preventDefault();
    console.log("Sign IN");
    db.collection("users")
      .where("name", "==", input2)
      .where("password", "==", input4)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        if (querySnapshot.empty === true) {
          alert(" LOGIN FAILED!  Please login again");
        }
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " =>", doc.data());
          dispatch({
            type: actionTypes.SET_USER,
            user: input2,
          });
        });
      });

    // dispatch({
    //   type: actionTypes.SET_USER,
    //   user: input2,
    // });
    setInput2("");
    setInput4("");
  };

  // const handleChange = (e) => {
  //   const image = e.target.files[0];
  //   setProfileImage(image);

  //   if (image === "" || image === undefined) {
  //     alert(`not an image,the file is a ${typeof image}`);
  //   }
  // };

  return (
    <div className="username">
      <div className="username_container">
        <form>
          <div className="new_user">
            <h3>Are you a new user?</h3>
            <input
              value={input1}
              placeholder="Enter your username"
              type="text"
              onChange={changeInput}
            />
            {/* {console.log(input1)} */}

            <input
              value={input3}
              placeholder="Enter the password"
              type="password"
              onChange={(e) => setInput3(e.target.value)}
            />
             {/* <input
              type="file"
              accept="image/gif , image/jpeg, image/png"
              name="image"
              id="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <p>
              <label htmlFor="file">Set profile photo</label>
            </p> */}

            <button type="submit" onClick={createuser}>
              Add new user
            </button>
          </div>
        </form>
        <form>
          <div className="old_user">
            <h3>Are you an existing user?</h3>
            <input
              value={input2}
              placeholder="Enter your username"
              type="text"
              onChange={(e) => setInput2(e.target.value)}
            />
            <input
              value={input4}
              placeholder="Enter the password"
              type="password"
              onChange={(e) => setInput4(e.target.value)}
            />
           
            <button type="submit" onClick={signIn}>
              Login Old user
            </button>
          </div>
        </form>
        {/* { console.log("User is " , user)} */}
      </div>
    </div>
  );
}

export default Username;
