import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AboutUsCardWrapper from "./AboutUsCardWrapper";
import { useAboutUsContext } from "./AboutUs";

function AboutUs3() {
  const aboutUsContext = useAboutUsContext();
  return (
    <AboutUsCardWrapper>
      <h4 className="text-xl">How Does Mise En Place Work?</h4>
      <p>
        Mise En Place is designed to be intuitive and easy-to-use. Start by creating your account
        and setting your preferences, such as dietary restrictions, allergies, and favorite
        cuisines. Our AI-powered system will then generate personalized recipe recommendations
        tailored to your tastes and requirements.
      </p>
      <p>
        Choose the recipes you want to try, and the app will automatically generate a shopping list
        based on the ingredients needed. With our grocery store API integration, you can
        effortlessly add items to your cart at your preferred store, streamlining your grocery
        shopping experience. Let&apos;s get cookin&apos;!
      </p>
      <div className="flex justify-between w-full">
        <IconButton
          onClick={aboutUsContext.goToPrev}
          className="rounded-full bg-secondary hover:bg-secondary-focus hover:scale-125"
        >
          <ArrowBackIosIcon className="relative left-1" />
        </IconButton>
        <IconButton
          onClick={aboutUsContext.goToNext}
          className="rounded-full bg-secondary hover:bg-secondary-focus hover:scale-125"
        >
          <ArrowForwardIosIcon className="relative" />
        </IconButton>
      </div>
    </AboutUsCardWrapper>
  );
}

export default AboutUs3;
