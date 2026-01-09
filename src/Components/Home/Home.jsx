import React from "react";
import Statistics from "../Statistics/Statistics";
import HeroSection from "../HeroSection/HeroSection";
import AllCards from "../CardSection/AllCards";

const Home = () => {
  return (
    <div className="max-w-[90%] mx-auto">
      <HeroSection></HeroSection>
      <Statistics></Statistics>
      <AllCards></AllCards>
    </div>
  );
};

export default Home;
