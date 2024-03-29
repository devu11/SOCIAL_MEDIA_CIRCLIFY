const adminReducer = (
  state = { authData: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case "AUTH_ADMIN_START":
      return { ...state, loading: true, error: null };
    case "AUTH_ADMIN_SUCCESS":
      localStorage.setItem("adminToken", action.data.token)
      localStorage.setItem("adminProfile", JSON.stringify({ ...action.data.user }));
      return { ...state, authData: action.data, loading: false, error: null };
      case "AUTH_ADMIN_FAIL":
        return{...state, loading:false, error:action.error};
        case "ADMIN_LOG_OUT":
            localStorage.removeItem("adminToken")
            localStorage.removeItem("adminProfile");
            return{...state, authData:null, loading:false,error:null}

            default:
                return state
  }
};
export default adminReducer