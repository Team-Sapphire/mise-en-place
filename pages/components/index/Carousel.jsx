import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";
const imageUrls = [
  [
    "A spread of vegetables",
    "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  ],
  [
    "fresh veggies, drizzled with sesame oil, rice vinegar and a kiss coconut aminos.",
    "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  ],
  [
    "A top-down picture of a spread of various food items. Very colorful and unique plates accompany the food.",
    "https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80",
  ],
  [
    "An image depicting a hand squeezing a lime onto fresh corn tortilla chicken tacos atop a fresh slab of wood.",
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
  ],
  [
    "Jeff's favorite food: cornflakes. An artistic image depicting a stream of cornflakes falling from the sky into a bowl perfectly positioned to catch them, already 90% full.",
    "https://images.unsplash.com/photo-1574156814151-ed649f815f4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  ],
];

function Carousel({ addCb, handleClick }) {
  const [imageI, setImageI] = useState(0);
  const timeBetween = 5000;
  const shared =
    " absolute shadow-xl shadow-secondary border-[1px] border-solid rounded-xl width-full";

  function increaseImageI() {
    setImageI((cur) => (cur + 1) % imageUrls.length);
  }

  useEffect(() => {
    addCb(increaseImageI);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence>
        <motion.img
          onClick={handleClick}
          className={shared + " border-primary max-h-full object-cover max-w-[calc(100%-30px]"}
          width={1280}
          key={imageUrls[imageI][1]}
          initial={{ y: -1000, opacity: 0, scale: 0, zIndex: 30, objectPosition: "100% 0%" }}
          animate={{ y: 0, opacity: 1, scale: 1, zIndex: 30, objectPosition: "100% 100%" }}
          exit={{ y: 100, opacity: 0, scale: 0, zIndex: 10 }}
          transition={{ type: "tween", duration: 2.5 }}
          height={720}
          src={imageUrls[imageI][1]}
          alt={imageUrls[imageI][0]}
        />
      </AnimatePresence>
    </div>
  );
}

export default Carousel;
