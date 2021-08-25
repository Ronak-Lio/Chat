import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";
import {useStateValue} from './StateProvider';
import { actionTypes } from "./reducer";
import AddNewChat from "./AddNewChat";
import { useHistory } from "react-router-dom";
import "./ParticipantChat.css";

function ParticipantChat({  id, name }) {
  const [{participants} ,dispatch] = useStateValue();
  const [{x}] = useStateValue();
  



  const addParticipant = () => {
    // {participants.map((participant) => {
    //   if(name === participant.name){
    //     console.log("Participant is already added");
    //   }
    // })}
    let y = 0;
    let i;
    for(i = 0; i < participants.length; i++) {
      if(name === participants[i].name) {
        console.log("Participant is already added");
        y =1;
      }
    }

    if((i===participants.length) && (y == 0)){
      dispatch({
        type: actionTypes.ADD_PARTICIPANT,
        participant: {
          name : name,
      },
      });
    }
    if((i===participants.length) && (y == 1))
    {
      dispatch({
        type : actionTypes.REMOVE_PARTICIPANT,
        name : name
      })
    }
    

    console.log(participants);

  }
    return (
        <div className="sidebarChat" onClick={addParticipant}>
        <Avatar  src = "https://th.bing.com/th/id/R850f75ce572a778227ca2d80581c9130?rik=TQpiSHSYzhlJyw&riu=http%3a%2f%2fmundoalbiceleste.com%2fwp-content%2fuploads%2f2019%2f03%2fIMG_20190309_231330.jpg&ehk=wyl6L3SinOV1uaxs9iOZaFth8dUtdhNZ6MgsOh5Fc%2bA%3d&risl=&pid=ImgRaw"/>
        {/* <h2>{id}</h2> */}
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          {/* <p>{messages[0]?.message}</p> */}
        </div>
      </div>
    )
}

export default ParticipantChat
