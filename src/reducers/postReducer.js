const postReducer =(
    state = {posts:[],loading:false,error:false,uploading:false,uploadingVideo: false},
action
)=>{
    switch(action.type){
case "UPLOAD_START":
    return{...state,posts:[action.data,...state.posts],
    uploading:false,error:false}

case "UPLOAD_SUCCESS":
    return {...state,posts:[action.data,...state.posts],
    uploading:false,error:false}
    case "UPLOAD_FAIL":
        return {...state,uploading:false,error:true}

        case "UPDATE_POST_REQUEST":
            return {
              ...state,

              updating: true,
              error: false,
            };
          case "UPDATE_POST_SUCCESS":
            return {
              ...state,
              updating: false,
              updatedPost: action.payload,
              error: false,
            };
          case "UPDATE_POST_FAILURE":
            return {
              ...state,
              updating: false,
              error: true,
            };
            
            case "DELETE_POST_REQUEST":
              return {
                ...state,
                loading: true,
                error: null,
              };
            case "DELETE_POST_SUCCESS":
              // Filter out the deleted post from the state
              const updatedPosts = state.posts.filter(post => post._id !== action.payload);
              return {
                ...state,
                posts: updatedPosts,
                loading: false,
                error: null,
              };
            case "DELETE_POST_FAILURE":
              return {
                ...state,
                loading: false,
                error: action.payload, // You might want to update the error state here
              };
              
            case "LIKE_POST_REQUEST":
              return {
                ...state,
                loading: true,
                error: false,
              };
            case "LIKE_POST_SUCCESS":
              return {
                ...state,
                loading: false,
                error: false,
                posts: state.posts.map((post) =>
                  post._id === action.payload._id ? action.payload : post
                ),
              };
            case "LIKE_POST_FAILURE":
              return {
                ...state,
                loading: false,
                error: true,
              };



              case "ADD_COMMENT_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        ),
      };
    case "ADD_COMMENT_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
      case "RETREIVING_START":
        return {
          ...state,
          loading: true,
          error: null
        };
      case "RETREIVING_SUCCESS":
        return {
          ...state,
          posts: action.data,
          loading: false,
          error: null
        };
      case "RETREIVING_FAIL":
        return {
          ...state,
          loading: false,
          error: action.payload // Make sure to handle error payload correctly if available
        };

        case "UPLOAD_VIDEO_START":
          return { ...state, uploadingVideo: true, error: false };
        case "UPLOAD_VIDEO_SUCCESS":
          return { ...state, uploadingVideo: false, error: false };
        case "UPLOAD_VIDEO_FAILURE":
          return { ...state, uploadingVideo: false, error: true };
          

      
        default: 
         return state
    }
}

export default postReducer;