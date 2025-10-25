import React from "react";
import Banner from "../../Component/Banner";
import CatCards from "../CatCards";
import Newarrivals from "./Newarrivals";
import Section from "./Section";

const Home = () => {
  return (
    <div>
      <Banner />
      <CatCards />
      <Newarrivals />
      {/* <Section/> */}
    </div>
  );
};

export default Home;
