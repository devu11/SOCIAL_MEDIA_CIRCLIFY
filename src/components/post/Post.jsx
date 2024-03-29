import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useDispatch, useSelector } from "react-redux";
import { likedPost, updatePost, addComment  } from "../../api/PostRequest";
import { deletePost } from "../../actions/PostAction";
import Swal from "sweetalert2";

function Post({ data, id, onDelete }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [liked, setLiked] = useState(() => {
    const storedLiked = localStorage.getItem(`post_liked_${id}`);
    return storedLiked
      ? JSON.parse(storedLiked)
      : data?.likes.includes(user._id);
  });
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem(`post_likes_${id}`);
    return storedLikes ? JSON.parse(storedLikes) : data?.likes.length || 0;
  });
  const [description, setDescription] = useState(data?.desc || "");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = localStorage.getItem(`post_comments_${id}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [id]);
  useEffect(() => {
    const storedDescription = localStorage.getItem(`post_description_${id}`);
    if (storedDescription !== null) {
      setDescription(storedDescription);
    }
  }, [id]);

  const saveCommentsToLocalStorage = (comments) => {
    localStorage.setItem(`post_comments_${id}`, JSON.stringify(comments));
  };

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    likedPost(data._id, user._id);
    setLikes((prevLikes) => (newLiked ? prevLikes + 1 : prevLikes - 1));
    localStorage.setItem(`post_liked_${id}`, JSON.stringify(newLiked));
    localStorage.setItem(
      `post_likes_${id}`,
      JSON.stringify(newLiked ? likes + 1 : likes - 1)
    );
  };

  

  const handleEdit = () => {
    Swal.fire({
      title: '<span class="small-title">Edit Post</span>',
      html: `Description
            <input id="swal-desc" class="swal2-input small-input" placeholder="Description" value="${description}"><br/>
            
        `,
      inputAttributes: {
        readonly: false,
      },
      preConfirm: () => {
        const newDescription = document.getElementById("swal-desc").value;

        setDescription(newDescription);
        updatePost({ ...data, desc: newDescription })
          .then((response) => {
            console.log("Description updated successfully in the backend.");
          })
          .catch((error) => {
            console.error("Error updating description:", error);
          });
        // Update local storage
        localStorage.setItem(`post_description_${id}`, newDescription);
      },
      customClass: {
        popup: "custom-swal-popup",
      },
      position: "top",
    });
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(data._id, user._id));
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
          timer: 500, // Display the toast message for 3 seconds
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };
  
  

  const handleComment = () => {
    Swal.fire({
      title: "Add Comment",
      html: `
        <input id="swal-comment" class="swal2-input" placeholder="Your comment">
        <span style="color: gray;">Comment by: ${user.username}</span>
      `,
      showCancelButton: true,
      confirmButtonText: "Comment",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const comment = document.getElementById("swal-comment").value;
        if (!comment) {
          Swal.showValidationMessage("Please enter a comment");
          return false;
        }
        try {
          await addComment(data._id, user._id, comment); 
          const newComment = { username: user.username, comment };
          setComments((prevComments) => [...prevComments, newComment]);
          saveCommentsToLocalStorage([...comments, newComment]);
          return true;
        } catch (error) {
          console.error("Error adding comment:", error);
          Swal.fire("Error", "Failed to add comment", "error");
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        popup: "custom-swal-popup",
        content: "custom-swal-content",
      },
      position: "top",
      grow: "row",
    });
    Swal.update({
      customClass: {
        popup: "custom-swal-popup",
        content: "custom-swal-content",
        confirmButton: "custom-swal-confirm-button",
      },
    });
  };
  




  if (!data) {
    return null;
  } 


  return (
    <div className="Post">
 {console.log("Data:", data)}
<div className="user-profile">
        <img
          src={
           user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt={user.username}
          className="profile-picture"
        />
        <span className="username">{user.username}</span>
      </div>

      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
       {data.video && <video  src={serverPublic + data.video} controls  />}

      
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={Comment}
          onClick={handleComment}
          style={{ cursor: "pointer" }}
          alt=""
        />
        <img src={Share} alt="" />
        <button onClick={handleEdit} className="edit-button">
          ⋮
        </button>
        <button onClick={handleDelete} className="deleteBtn">🗑️</button>
      </div>

      <span style={{ color: "var(--gray)", fontSize: "15px" }}>
        {likes}likes
      </span>

      <div className="details">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {description}</span>
        
      </div>

      <div className="comments">
        <h3>Comments</h3>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>
              <b>{comment.username}</b>: {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
