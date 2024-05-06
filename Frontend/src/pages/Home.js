import React from "react";
import Photo from "../assests/Home.jpg";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen text-white font-bold text-2xl">
      {/* Welcome to Home Page */}
      <div className="  pt-8">
        <img
          src={Photo}
          alt="pattern"
          width={1400}
          height={900}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Home;
