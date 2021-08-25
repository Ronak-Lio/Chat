export const initialState = {
  newuser : null,
  user: null,
  userId: null,
  receiver: null,
  receiverId: null,
  roomidr: null,
  newreceiverId: null,
  password : null,
  typeofchat : null,
  participantId : null,
  participants : [],
  x : 0,
  groupName : null,
};

export const actionTypes = {
  SET_NEW_USER: 'SET_NEW_USER',
  SET_USER: "SET_USER",
  SET_USER_ID: "SET_USER_ID",
  SET_RECEIVER: "SET_RECEIVER",
  SET_RECEIVER_ID: "SET_RECEIVER_ID",
  SET_ROOM_IDR: "SET_ROOM_IDR",
  SET_NEWRECEIVER_ID : "SET_NEWRECEIVER_ID",
  SET_PASSWORD: "SET_PASSWORD",
  SET_TYPE : "SET_TYPE",
  SET_PARTICIPANT_ID : "SET_PARTICIPANT_ID",
  ADD_PARTICIPANT : "ADD_PARTICIPANT",
  SET_X : "SET_X",
  REMOVE_PARTICIPANT : "REMOVE_PARTICIPANT",
  SET_GROUPNAME : "SET_GROUPNAME",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case actionTypes.SET_RECEIVER:
      return {
        ...state,
        receiver: action.receiver,
      };
    case actionTypes.SET_RECEIVER_ID:
      return {
        ...state,
        receiverId: action.receiverId,
      };
    case actionTypes.SET_ROOM_IDR:
      return {
        ...state,
        roomidr: action.roomidr,
      };
      case actionTypes.SET_NEWRECEIVER_ID:
        return {
          ...state,
          newreceiverId: action.newreceiverId,
        };
        case actionTypes.SET_NEW_USER:
          return {
            ...state,
            newuser: action.newuser,
          };
          case actionTypes.SET_PASSWORD:
          return {
            ...state,
           password : action.password,
          };
          case actionTypes.SET_TYPE:
          return {
            ...state,
           typeofchat : action.typeofchat,
          };
          case actionTypes.SET_PARTICIPANT_ID:
            return {
              ...state,
              participantId: action.participantId,
            }
            case actionTypes.ADD_PARTICIPANT:
            return {
              ...state,
              participants: [...state.participants , action.participant],
            }
            case actionTypes.SET_X:
              return {
                ...state,
                x: action.x,
              }
            case actionTypes.REMOVE_PARTICIPANT:
              const index = state.participants.findIndex(
                (participant) => participant.name === action.name
            );
            let newparticipants = [...state.participants];

            if(index >=0){
                newparticipants.splice(index, 1);
            }else{
                console.warn(
                    `Can't remove product (id: ${action.id} as its not in the basket)`
                )
            }

            return {
                ...state,
                participants : newparticipants
            }
            case actionTypes.SET_GROUPNAME:
              return {
                ...state,
                 groupName : action.groupName,
              }
            
            
        
    default:
      return state;
  }
};

export default reducer;
