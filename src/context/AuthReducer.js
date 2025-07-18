// const AuthReducer = (state,action) =>{
//     switch(action.type){
//         case "LOGIN_START":
//             return{
//                 user:null,
//                 isFecthing: true,
//                 error: false,
//             };
//         case "LOGIN_SUCCESS":
//             return{
//                 user:action.payload,
//                 isFecthing: false,
//                 error: false,
//             };
//         case "LOGIN_FAILURE":
//             return{
//                 user:null,
//                 isFecthing: false,
//                 error: action.payload,
//             };          
//         default:
//             return state;

//     }
// };

// export default AuthReducer;

const AuthReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,  // Fixed typo
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,  // Fixed typo
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,  // Fixed typo
        error: action.payload,
      };
      case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings:[...state.user.followings, action.payload]
        }
      };
       case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter((following) => following !== action.payload),
        }
      };
    default:
      return state;
  }
};

export default AuthReducer;