export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START",
});

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error)=>({
    type:"LOGIN_FAILURE",
    payload:error
});

export default AuthActions;

export const Follow = (userId)=>({
    type: "FOLLOW",
    payload: userId,
})

export const unFollow = (userId)=>({
    type: "UNFOLLOW",
    payload: userId,
})