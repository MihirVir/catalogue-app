import React from "react";
import Home from "../components/Home/Home";
import Nav from "../components/Nav/Nav";
import "./homepage.css";
const HomePage = () => {
  return (
    <>
      <div className="home-page-container">
        <Nav />
        <main>
          <Home />
        </main>
      </div>
    </>
  );
};

export default HomePage;
