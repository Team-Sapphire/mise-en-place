import Image from "next/image";
import { Inter } from "next/font/google";
import RecipePage from "./recipe.jsx";
import MainPage from "./main.jsx";
import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Carousel from "./components/index/Carousel";
import Testimonials from "./components/index/Testimonials";

const inter = Inter({ subsets: ["latin"] });
const shared =
  " duration-500 shadow-xl shadow-black border-[1px] border-solid rounded-xl width-full animate-in slide-in-from-top-40";

// const a = "animate-in slide-in-from-left hover:slide-in-from-right";
//const animations =
//  "[&>*]:animate-out [&>*]:animate-in [&>*:nth-child(3)]:slide-in-from-right-40 [&>*:nth-child(1)]:slide-out-to-right-40 [&>*:nth-child(3)]:animate-in [&>*:nth-child(3)]:slide-in-from-bottom-10 [&>*:nth-child(3)]:slide-in-from-right-10 ";

export default function Home() {
  const timeBetween = 5000;
  const [cbs, setCbs] = useState([]);
  const timerRef = useRef(null);

  function callAllCbs(allCbs) {
    for (var i = 0; i < allCbs.length; i++) {
      allCbs[i]();
    }
  }

  const timerCallback = () => {
    callAllCbs(cbs);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(timerCallback, timeBetween);
  };

  function goToNext() {
    clearTimeout(timerRef.current);
    timerCallback();
  }

  useEffect(() => {
    timerRef.current = setTimeout(timerCallback, timeBetween);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  function addCb(cb) {
    setCbs((prevCbs) => {
      const ret = [...prevCbs];
      if (!ret.includes(cb)) ret.push(cb);
      return ret;
    });
  }

  const [cards, setCards] = useState([
    <Image
      className={"border-green-900 " + shared}
      alt="bowl of fruit"
      width={1280}
      key={1}
      height={720}
      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    />,

    <Image
      className={shared + " border-black "}
      alt="bowl of fruit"
      width={1280}
      key={2}
      height={720}
      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    />,

    <Image
      className={shared + " border-red-900 "}
      alt="bowl of fruit"
      width={1280}
      key={3}
      height={720}
      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    />,
  ]);

  return (
    <main
      style={{ gridTemplate: "10% 55% 35% / 25% 50% 25%" }}
      className="grid w-full h-full overflow-hidden bg-gray-400"
    >
      <div className="row-span-1 row-start-1">Header/logo</div>
      <div className="relative flex flex-col items-center col-start-2 row-start-2">
        <Carousel handleClick={goToNext} addCb={addCb} />
      </div>
      <Testimonials handleClick={goToNext} addCb={addCb} />
    </main>
  );
}
