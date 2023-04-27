import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import MainPage from "./main.jsx";
import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Carousel from "../src/components/index/Carousel";
import Testimonials from "../src/components/index/Testimonials";
import AboutUs from "../src/components/index/AboutUs";
import Header from "../src/components/header/Header";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const shared =
  " duration-500 shadow-xl shadow-black border-[1px] border-solid rounded-xl width-full animate-in slide-in-from-top-40";

// const a = "animate-in slide-in-from-left hover:slide-in-from-right";
//const animations =
//  "[&>*]:animate-out [&>*]:animate-in [&>*:nth-child(3)]:slide-in-from-right-40 [&>*:nth-child(1)]:slide-out-to-right-40 [&>*:nth-child(3)]:animate-in [&>*:nth-child(3)]:slide-in-from-bottom-10 [&>*:nth-child(3)]:slide-in-from-right-10 ";

export default function Home(req, res) {
  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const timeBetween = 5000;
  const [cbs, setCbs] = useState([]);
  const timerRef = useRef(null);
  const router = useRouter();

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

  useEffect(() => {
    if (user) {
      axios
        .get("/api/users/" + user.sub.slice(14))
        .then((res) => {
          if (res.data.rows.length === 0) {
            // redirect to preferences page
            router.push("/userprofile");
          } else {
            // redirect to main page ?
            router.push("/main");
          }
        })
        .finally(() => setLoading(false));
    } else if (!isLoading) setLoading(false);
  }, [user, isLoading]);

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
      className="grid w-full h-full z-[-1] fixed min-w-[650px] text-primary bg-base-100"
    >
      {loading && (
        <div className="fixed z-[50] flex items-center justify-center w-full h-full bg-base-200">
          <p>Loading...</p>
        </div>
      )}
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
            className="normal-case text-secondary rounded-md border-[1px] border-solid bg-base-100 hover:bg-base-200 border-primary "
          >
            Loading...
          </Button>
        ) : (
          <Link className="mainLink" href={!user ? "/api/auth/login" : "/main"}>
            <Button
              sx={{ fontSize: "24pt" }}
              className="normal-case text-secondary rounded-md border-[1px] border-solid border-primary  bg-base-100 hover:bg-base-200"
            >
              {!user ? "Connect with Kroger" : "Let's Get Cookin'"}
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
}
