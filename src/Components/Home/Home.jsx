import React from "react";
import Statistics from "../Statistics/Statistics";
import HeroSection from "../HeroSection/HeroSection";
import AllCards from "../CardSection/AllCards";
import Tips from "../TipsSection/Tips";
import UpcomingEvents from "../Event/UpcomingEvents";

const Home = () => {
  return (
    <div className="max-w-[90%] mx-auto ">
      <HeroSection></HeroSection>
      <Statistics></Statistics>
      <AllCards></AllCards>
      <Tips></Tips>
      <UpcomingEvents></UpcomingEvents>
    </div>
  );
};

export default Home;
