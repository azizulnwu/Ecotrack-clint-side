import React from "react";
import Statistics from "../Statistics/Statistics";
import HeroSection from "../HeroSection/HeroSection";

const Home = () => {
  return (
    <div className="max-w-[90%] mx-auto">
      <HeroSection></HeroSection>
      <Statistics></Statistics>
    </div>
  );
};

export default Home;
