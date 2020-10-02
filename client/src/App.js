import React, { useState } from "react";
import "./App.css";
import { Home } from "./views/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Register } from "./views/Register/Register";
import UserContext from "./context/UserContext";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const [value, setValue] = useState("");
  return (
    <Router>
      <UserContext.Provider value={{ value, setValue }}>
        <Route exact path="/" component={Register} />
        <ProtectedRoute value={value} exact path="/home" component={Home} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
