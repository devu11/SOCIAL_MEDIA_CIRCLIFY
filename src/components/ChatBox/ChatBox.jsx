import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { addMessage, getMessages } from "../../api/MessageRequest.js";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { FcVideoCall } from "react-icons/fc";
import { BsFillMicMuteFill, BsCameraVideoOffFill } from "react-icons/bs";
import Peer from "peerjs";

function ChatBox({
  chat,
  currentUser,
  selectedUser,
  setSendMessage,
  receiveMessage,
  userData,
}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [peer, setPeer] = useState(null);
  const [call, setCall] = useState(null);
  const [callState, setCallState] = useState("idle");
  const [showMuteIcons, setShowMuteIcons] = useState(false);
  const localVidRef = useRef();
  const remoteVidRef = useRef();
  const scroll = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    if (receiveMessage) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [receiveMessage]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
      receiverId: selectedUser ? selectedUser._id : chat.participantId,
      senderUsername: userData.username,
    };

    try {
      const { data } = await addMessage(message);
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    setSendMessage(message);
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const peer = new Peer(undefined, {
      host: "/",
      port: "3002",
    });

    setPeer(peer);

    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
    });

    peer.on("call", (call) => {
      call.answer(window.localStream);
      setCall(call);
      setCallState("connected");
      call.on("stream", (remoteStream) => {
        if (remoteVidRef.current) {
          remoteVidRef.current.srcObject = remoteStream;
        }
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);

   const startCall = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVidRef.current) {
        localVidRef.current.srcObject = localStream;
      }

      setCallState("calling");
      const call = peer.call(selectedUser._id, localStream);
      setCall(call);

      call.on("stream", (remoteStream) => {
        if (remoteVidRef.current) {
          remoteVidRef.current.srcObject = remoteStream;
        }
        setCallState("connected");
      });

      setShowMuteIcons(true); // Show mute icons when call is initiated
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert(
        "Please allow access to your camera and microphone to make a video call."
      );
    }
 };

  const toggleAudio = () => {
    if (window.localStream) {
      const audioTracks = window.localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !audioTracks[0].enabled;
      }
    }
  };

  const toggleVideo = () => {
    if (window.localStream) {
      const videoTracks = window.localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
      }
    }
  };

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="chat-header">
            {userData ? (
              <div className="follower">
                <div className="pro">
                  <img
                    src={
                      userData.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt=""
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name1" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData.firstname} {userData.lastname}
                    </span>
                  </div>
                  <div className="videoCall">
                    <FcVideoCall
                      onClick={startCall}
                      style={{ fontSize: "50px", cursor: "pointer" }}
                    />
                    {callState === "calling" && <div>Calling...</div>}
                  </div>
                  <video
                    ref={localVidRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: "400px", height: "400px" }}
                  />
                  <video
                    ref={remoteVidRef}
                    autoPlay
                    playsInline
                    style={{ width: "300px", height: "300px" }}
                  />

                  <BsFillMicMuteFill
                    onClick={toggleAudio}
                    style={{
                      position: "absolute",
                      bottom: "100px",
                      left: "500px",
                      color:"red"
                    }}
                    className="video-control-button"
                  />

                  <BsCameraVideoOffFill
                    onClick={toggleVideo}
                    style={{
                      position: "absolute",
                      bottom: "100px",
                      right: "750px",
                      color:"red"
                    }}
                    className="video-control-button"
                  />
                </div>
              </div>
            ) : (
              <div className="loading-message">Loading...</div>
            )}
          </div>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div
                key={index}
                ref={scroll}
                className={
                  message.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{message.text}</span>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button button" onClick={handleSend}>
              Send
            </div>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a User to start Conversation...
        </span>
      )}
    </div>
  );
}

export default ChatBox;
