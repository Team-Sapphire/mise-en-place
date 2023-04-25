import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const testimonials = [
  [
    "Mise en place ruined my life. I want my wife back.",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "Jeff",
  ],
  [
    "karate oalvn jfiehl",
    "https://images.unsplash.com/photo-1594333806830-27e001adb081?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=766&q=80",
    "Person #1 & Person #2",
  ],
  [
    "Lorem ipsum olasz",
    "https://images.unsplash.com/photo-1529424601215-d2a3daf193ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "Jess and Kelsey",
  ],
];

function Testimonials({ addCb, handleClick }) {
  const [idx, setIdx] = useState(0);

  function increaseIdx() {
    setIdx((idx) => (idx + 1) % testimonials.length);
  }

  useEffect(() => {
    addCb(increaseIdx);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center self-end col-start-3 row-start-3 mr-2 bg-white rounded-lg h-fit"
      onClick={handleClick}
    >
      <AnimatePresence>
        <motion.img
          height={200}
          width={220}
          className="absolute top-[-180px] h-[200px] w-3/4 object-cover rounded-lg"
          src={testimonials[idx][1]}
          alt="A real user of Mise en Place."
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 300 }}
          transition={{ type: "tween", duration: 1.5 }}
          key={testimonials[idx][1]}
        />
      </AnimatePresence>
      <div className="z-10 flex flex-col justify-between w-full p-2 text-white duration-300 bg-black rounded-lg justify-self-start animate-out fade-out-30">
        <p className="mb-2">{testimonials[idx][0]}</p>
        <p className="self-end text-sm">{testimonials[idx][2]}</p>
      </div>
    </div>
  );
}

export default Testimonials;
