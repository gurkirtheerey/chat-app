import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Register.css";
import { v4 as uuidv4 } from "uuid";
import { Home } from "../Home/Home";

export const Register = () => {
  const { value, setValue } = useContext(UserContext);

  const history = useHistory();

  let user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return <Home />;
  }

  const saveUser = () => {
    if (value) {
      const id = uuidv4();
      const user = { id, value };
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/home");
    }
  };

  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button disabled={!value} onClick={saveUser}>
          Enter Chatroom
        </button>
      </div>
    </div>
  );
};
