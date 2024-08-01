import React from "react";
import Features from "./Sections/Features";
import FAQ from "./Sections/FAQ";
import AboutUs from "./Sections/AboutUs";

const Section = ({darkMode}) => {
  return (
    <>
    <Features darkMode={darkMode}/>
    <AboutUs darkMode={darkMode}/>
    </>
  );
};

export default Section;
