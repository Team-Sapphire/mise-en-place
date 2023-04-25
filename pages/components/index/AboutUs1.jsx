import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AboutUsCardWrapper from "./AboutUsCardWrapper";
import { useAboutUsContext } from "./AboutUs";

function AboutUs1({ prev, next }) {
  const aboutUsContext = useAboutUsContext();

  return (
    <AboutUsCardWrapper>
      <h4 className="text-xl">What is Mise En Place?</h4>
      <img
        className="h-[200px] object-contain"
        src="https://images.unsplash.com/photo-1609776453672-bb7d86d07a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      />
      <p className="overflow-y-auto">
        Mise En Place is an innovative app designed to revolutionize the home cooking experience,
        making it as easy and enjoyable as possible for people with busy lives. Our platform offers
        an efficient, user-friendly solution for meal planning, recipe recommendations, and grocery
        shopping, all tailored to your personal preferences and dietary needs.
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

export default AboutUs1;
