import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
const imageUrls = [
  [
    "fresh veggies, drizzled with sesame oil, rice vinegar and a kiss coconut aminos.",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80",
  ],
  [
    "A red curry dish",
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ],
  [
    "A spread of vegetables",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  ],
];

function Carousel({ addCb, handleClick }) {
  const { user, error, isLoading } = useUser();
  console.log(user, error, isLoading);

  const [imageI, setImageI] = useState(0);
  const timeBetween = 5000;
  const shared = " absolute shadow-xl shadow-black border-[1px] border-solid rounded-xl width-full";

  function increaseImageI() {
    setImageI((cur) => (cur + 1) % imageUrls.length);
  }

  useEffect(() => {
    addCb(increaseImageI);
  }, []);

  return (
    <div className="w-full h-full">
      <AnimatePresence>
        <motion.img
          onClick={handleClick}
          className={shared + " border-transparent"}
          width={1280}
          key={imageUrls[imageI][1]}
          initial={{ y: -1000, opacity: 0, scale: 0 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 600, opacity: 0, scale: 0 }}
          transition={{ type: "tween", duration: 2.5 }}
          height={720}
          src={imageUrls[imageI][1]}
          alt={imageUrls[imageI][0]}
        />
      </AnimatePresence>
      <div className="absolute bottom-0 flex self-end justify-around w-full">
        <Link href="/main">
          <Button>{!user ? "Connect with Kroger" : "Let's Get Cookin'"}</Button>
        </Link>
      </div>
    </div>
  );
}

export default Carousel;
