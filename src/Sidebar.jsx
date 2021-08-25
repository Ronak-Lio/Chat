import React, {useState , useEffect } from 'react';
import './Sidebar.css'


import {Avatar} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';
// import Chat from './Chat';
import db from "./firebase";
import {useStateValue} from "./StateProvider";
import { actionTypes } from "./reducer";
import {useHistory} from "react-router-dom";




function Sidebar() {
    const[rooms , setRooms] = useState([]);
    const[{user} , dispatch] = useStateValue();
    const[{userId}] = useStateValue();
    const[uID , setuID] = useState();
    const history = useHistory();
    const[profilePhotoUrl , setProfilePhotoUrl] = useState();
    useEffect(() => {
        console.log("In sidebar user is " , user);

        db.collection('users').doc(userId).onSnapshot((snapshot) => {
            console.log(snapshot.data(). profilePhotoUrl);
            setProfilePhotoUrl(snapshot.data(). profilePhotoUrl)
        })

        db.collection("users").doc(userId).collection("rooms").onSnapshot((snapshot)=>setRooms(
            snapshot.docs.map((doc) => ({ 
                id: doc.id,
                data: doc.data(),
            }))
        )

     );

       
    } , [userId]);
  
    return (
        <div className="sidebar">
            <div className="sidebar_header">
            <IconButton onClick={(e) => {history.push("/addProfilePhoto")}}>
            <Avatar src = {profilePhotoUrl}/>
            </IconButton>
            <div className="sidebar_headerRight">
            <IconButton>
            <DonutLargeIcon/>
            </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
            <IconButton>
               <MoreVertIcon/>
            </IconButton>
            </div>    
            </div>
            <div className="sidebar_search">
            <div className="sidebar_searchContainer">
            <SearchOutlined/>
             <input placeholder="Search or start new chat" type="text" />  
            </div>  
            </div>
           {/* { console.log(id)} */}

            <div className="sidebar_chats">
               <SidebarChat addNewChat/>
                { console.log(userId)}
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id}
                    name= {room.data.name} />
                ))}
            </div>       
        </div>
    );
}


export default Sidebar
