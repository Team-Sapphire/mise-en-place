import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AboutUsCardWrapper from "./AboutUsCardWrapper";
import { useAboutUsContext } from "./AboutUs";

function AboutUs2({ prev, next }) {
  const aboutUsContext = useAboutUsContext();
  return (
    <AboutUsCardWrapper>
      <h4 className="text-xl">We&apos;ve got you covered!</h4>
      <img
        className="h-[200px] object-contain"
        src="https://images.unsplash.com/photo-1609776453672-bb7d86d07a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      />
      <p className="overflow-y-auto">
        With Mise En Place, you can discover new recipes, keep track of your favorite dishes, and
        even have ingredients automatically added to your shopping cart at your preferred grocery
        store. Our AI integration ensures that the recipes you receive align with your tastes and
        preferences, while our community features connect you with fellow food enthusiasts, making
        your culinary journey more engaging and enjoyable.
      </p>
      <div className="flex justify-between w-full">
        <IconButton
          onClick={aboutUsContext.goToPrev}
          className="bg-white rounded-full hover:scale-125"
        >
          <ArrowBackIosIcon className="relative left-1" />
        </IconButton>
        <IconButton
          onClick={aboutUsContext.goToNext}
          className="bg-white rounded-full hover:scale-125"
        >
          <ArrowForwardIosIcon className="relative" />
        </IconButton>
      </div>
    </AboutUsCardWrapper>
  );
}

export default AboutUs2;
