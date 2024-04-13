import React, { useEffect, useState } from "react";
import "./Posts.css";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getTimelinePosts } from "../../actions/PostAction.js";
import { useParams } from "react-router-dom";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

function Posts() {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id, currentPage, postsPerPage));
  }, [dispatch, user._id, currentPage, postsPerPage]);

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId, user._id));
  };

  // Filter out undefined posts and posts without _id property
  const filteredPosts = posts.filter(
    (post) =>
      post &&
      post._id &&
      (post.userId === user._id || user.following.includes(post.userId))
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : currentPosts.map((post) =>
            post && post._id ? (
              <Post
                key={post._id}
                data={post}
                id={post._id}
                onDelete={() => handleDeletePost(post._id)}
                user={post.user}
              />
            ) : null
          )}
      {filteredPosts.length > 0 && ( // Conditionally render pagination buttons
        <div className="paginationUsers">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
             <FaLessThan /> Prev
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredPosts.length / postsPerPage)
            }
          >
           Next  <FaGreaterThan />
          </button>
        </div>
      )}
    </div>
  );  
}

export default Posts;
