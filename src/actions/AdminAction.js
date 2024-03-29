import * as AdminApi from '../api/AdminRequest.js';

export const adminLogIn = (formData)=> async(dispatch)=>{
    dispatch({type: "AUTH_ADMIN_START"});
    try {
        const {data} = await AdminApi.adminLogIn(formData);
        dispatch({type: "AUTH_ADMIN_SUCCESS", data})

    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_ADMIN_FAIL", error: error.response.data.message || "An error occurred" });
        
    }
}
export const adminLogOut = ()=> async(dispatch)=>{
    dispatch({type: "ADMIN_LOG_OUT"})
}

