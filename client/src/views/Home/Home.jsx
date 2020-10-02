import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import socketIOClient from "socket.io-client";
const WSServer = "http://127.0.0.1:5000";

export const Home = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [myMessages, setMyMessages] = useState([]);
  const [connection, setConnection] = useState(null);

  const inputRef = useRef();

  const [{ id, value }, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // initial socket io connection and set initial messages
  useEffect(() => {
    const establishConnection = async () => {
      try {
        await setConnection(socketIOClient(WSServer));
        console.log("Connected!");
        const response = await fetch("http://localhost:5000");
        const data = await response.json();
        if (data) {
          setMessages(data);
          let myData = data.filter((message) => message.id === id);
          setMyMessages(myData);
        }
      } catch (e) {
        console.log(e);
      }
    };
    establishConnection();
  }, []);

  useEffect(() => {
    connection && connection.on("join_room", (message) => console.log(message));
  }, [connection]);

  useEffect(() => {
    connection &&
      connection.on("message", (message) => {
        setMessages([...messages, message]);
      });
  }, [connection, messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    connection.emit("message", { id, message: text });
    setText("");
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="page">
      <h1 className="title">Hello, {value}</h1>
      <form className="chat-box" onSubmit={(e) => sendMessage(e)}>
        <div>
          {messages.map((msg, i) => (
            <p
              className={`chat ${msg.id === id ? "text-right" : "text-left"}`}
              key={i}
            >
              {msg.message}
            </p>
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Send Message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};
