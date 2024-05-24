import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Pie from "../../components/chart/Pie";
import "./home.scss";
import Line from "../../components/chart/Line";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="system users" />
          <Widget type="program" />
          <Widget type="channel" />
        </div>
        <div>
          <Pie />
        </div>
        <div>
            <Line />
        </div>
      </div>
    </div>
  );
};

export default Home;
