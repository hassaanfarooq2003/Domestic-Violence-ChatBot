import React from "react";
import Features from "./Sections/Features";
import FAQ from "./Sections/FAQ";
import Reviews from "./Sections/Reviews";

const Section = ({darkMode}) => {
  return (
    <>
    <Features darkMode={darkMode}/>
    <Reviews darkMode={darkMode}/>
    <FAQ darkMode={darkMode}/>
    </>
  );
};

export default Section;
