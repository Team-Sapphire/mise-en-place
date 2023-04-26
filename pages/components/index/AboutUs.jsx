import React, { useState, createContext, useContext } from "react";
import AboutUs1 from "./AboutUs1";
import { AnimatePresence } from "framer-motion";
import AboutUs2 from "./AboutUs2";
import AboutUs3 from "./AboutUs3";

export function useAboutUsContext() {
  return useContext(AboutUsContext);
}

const AboutUsContext = createContext();

function AboutUs() {
  const [cardIdx, setCardIdx] = useState(0);
  const cards = [
    <AboutUs1 key={"0th aboutUs"} />,
    <AboutUs2 key={"1stnd aboutUs caRD"} />,
    <AboutUs3 key={"3"} />,
  ];
  function goToNext() {
    setCardIdx((i) => {
      const ret = (i + 1) % cards.length;
      return ret;
    });
  }

  function goToPrev() {
    setCardIdx((i) => (i - 1 >= 0 ? i - 1 : cards.length - 1));
  }

  return (
    <AboutUsContext.Provider value={{ goToNext, goToPrev }}>
      <div className="w-full h-full col-span-2 col-start-4 row-start-2 z-[-1]">
        {cards[cardIdx]}
        {/* <p>Mise En Place is here to do the heavy lifting in the kitchen for you</p>
      <p>Cooking is hard. We get it.</p>
    <p>{`That's why we strive to make cooking as easy as possible.`}</p> */}
      </div>
    </AboutUsContext.Provider>
  );
}

export default AboutUs;
