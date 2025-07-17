import { createContext,useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE ={
//     user: {
// _id:"6816f3938d26a467146f4f73",
// username:"ganu",
// email:"ganu@gmail.com",
// profilePicture:"person/1.png",
// coverPicture:"",
// followers:[],
// followings:[],
// isAdmin: false,
//     },
    user:null,
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider =({children})=>{
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return(
        <AuthContext.Provider 
        value={{user:state.user,
        isFetching:state.isFetching, 
        error:state.error,
        dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}