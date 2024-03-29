import React, { useEffect } from "react";
import './Posts.css'
import Post from "../post/Post";
import { useDispatch ,useSelector} from "react-redux";
import { deletePost, getTimelinePosts } from "../../actions/PostAction.js";
import { useParams } from "react-router-dom";

function Posts(){
    const dispatch = useDispatch()
    const params = useParams()
    const {user} = useSelector((state)=> state.authReducer.authData)
    const {posts, loading} = useSelector((state) => state.postReducer);
   
    useEffect(() => {
      dispatch(getTimelinePosts(user._id))
    }, [dispatch, user._id]);

    const handleDeletePost = (postId) => {
      dispatch(deletePost(postId, user._id));
    };

    // Filter out undefined posts and posts without _id property
    const filteredPosts = posts.filter(post => post && post._id && (post.userId === user._id || user.following.includes(post.userId)));

    
    return (
      <div className="Posts">
        {loading ? "Fetching Posts..." : (
          filteredPosts.map((post) => (
            post && post._id ? (
              <Post key={post._id} data={post} id={post._id} onDelete={() => handleDeletePost(post._id)} />
            ) : null
          ))
        )}
      </div>
    );
}

export default Posts;
