import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import RecipePage from "./recipe/[id].js";
import MainPage from "./main.jsx";
import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Carousel from "./components/index/Carousel";
import Testimonials from "./components/index/Testimonials";
import AboutUs from "./components/index/AboutUs";
import Header from "./components/header/Header";

const inter = Inter({ subsets: ["latin"] });
const shared =
  " duration-500 shadow-xl shadow-black border-[1px] border-solid rounded-xl width-full animate-in slide-in-from-top-40";

// const a = "animate-in slide-in-from-left hover:slide-in-from-right";
//const animations =
//  "[&>*]:animate-out [&>*]:animate-in [&>*:nth-child(3)]:slide-in-from-right-40 [&>*:nth-child(1)]:slide-out-to-right-40 [&>*:nth-child(3)]:animate-in [&>*:nth-child(3)]:slide-in-from-bottom-10 [&>*:nth-child(3)]:slide-in-from-right-10 ";

export default function Home() {
  const { user, error, isLoading } = useUser();
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
    timerCallback();
  }

  useEffect(() => {
    timerRef.current = setTimeout(timerCallback, timeBetween);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [cbs]);

  function addCb(cb) {
    setCbs((prevCbs) => {
      const ret = [...prevCbs];
      if (!ret.includes(cb)) ret.push(cb);
      return ret;
    });
  }

  return (
    <main
      style={{ gridTemplate: "10% 75% 15% / 12.5% 0% 50% 12.5% 25%" }}
      className="grid w-full h-full overflow-x-scroll bg-transparent z-[-1] fixed min-w-[650px]"
    >
      <img
        className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-[-10]"
        src="https://x.yummlystatic.com/web/banner-marble-bkg.jpg"
      />
      <Header className="col-span-5 col-start-1 " />
      <div className="relative flex flex-col items-center col-start-3 row-start-2">
        <Carousel handleClick={goToNext} addCb={addCb} />
      </div>
      <Testimonials handleClick={goToNext} addCb={addCb} />
      <AboutUs />

      <div className="fixed flex self-end justify-center w-[75%] left-0 bottom-10">
        {isLoading ? (
          <Button
            sx={{ fontSize: "24pt" }}
            classname="normal-case rounded-md border-[1px] border-solid border-black hover:bg-slate-100"
          >
            Loading...
          </Button>
        ) : (
          <Link className="mainLink" href={!user ? "/api/auth/login" : "/main"}>
            <Button
              sx={{ fontSize: "24pt" }}
              className="normal-case rounded-md border-[1px] border-solid border-black hover:bg-slate-100"
            >
              {!user ? "Connect with Kroger" : "Let's Get Cookin'"}
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
}
