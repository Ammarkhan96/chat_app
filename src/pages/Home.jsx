import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Home() {
 
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  });

  if (loading) {
   
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return navigate("/login");
  }

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;