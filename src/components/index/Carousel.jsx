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
  [
    "A delicious assortment of baked chicken and other goodies",
    "https://edamam-product-images.s3.amazonaws.com/web-img/01c/01cacb70890274fb7b7cebb975a93231.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLWVhc3QtMSJHMEUCIQCVgt8FSQQrQQTNomZ7LBJIB1wtzAbquIcK0kvLehBUmAIgA2WbthrvG9SxZC%2BRBvPdfJKoR%2Bti6AKAQZg5rOvqPRwquQUIYBAAGgwxODcwMTcxNTA5ODYiDD5i7mA3ftQCHBZAnCqWBUh%2BVcrCl3Yj51c3jYY6pi%2FPSwCKZmLr4K1dddaOC%2BBHmBJFfn6y0cWa6ctoIhiTfy6PFXkUxfkxmdb5OR8dj3xYZUE9%2Ff8XFPGMEXsbypAsVkM8xsdie5RLWFiPrJHms5FOE6FOWGEteHb4i5e7wh4vzaIvaapfHs8hnuHSXA21DM77YfPsNWHDUWW8bt6o2fvdNdh3XU2mToZ2fhQ0UBAhG4fJc2b3IqIfKtejrpnhlWxxmtqBNvjZdVIO9ORWBa1PrBRturvmaOB8CQgPzohKNY%2B0SV3NrRuaxmBnx965h7E98OAYJ3mO3QKEYO6xjgT0yZmm6FsAcIFMmsPaLcbMuFbyBpK1YsfSFdIYmFo%2F9FUMlHpA07jI4PpB%2FhTkKqGKVpbcI1Cn16ORVjyJKR8bjcsvREdOhy33H8o4cI%2Fx2RRCyqe1Arjo2O7ghD5b3bSRU2SWl3OTpZRmAijmDQrZwTFnWeLGX4vJwaGd0f4KBcLnSrOBOMdKcHsLSqDigSd4evKC3fkQFOu%2FW%2BCXgIiptWjlI3ftpGL724NzNmLk%2FaCBba%2B9ZKq0KdXZ%2BDDJoBgRV7vxLNJqbxqnBgOEOIV%2FRD8EKmQna1GZvAVQGWTp8KPw5q4cNJlK2c1al8Vibw5ZjCBHBw8VMbOGXOrDl4%2FXFzILWa5O1ZUffDbFJbX%2FvhaPXDzK1d3wzYw1nCoPdeHgwK8ndzk9%2FEEQVhwr6ESlgNYfRYxJCHtf01scyXPBKVU0ZQmTD1pQct2N8PwpLp7EjEm6WC23dcD%2FWcpF9M%2BnAfZk8Cn%2FfYTJy9XqACzjnevRX%2FrblwwIpR5DmLs5ImGUo%2Ft86gvjwJLcNVzWK%2FKuEe8VpFOtV4dMs4ihp6YJb%2FQwUAhVMMG7r6IGOrEB2mG%2FcigSN7WCigWB8xrHYEQnKhoBesaufqiYe8%2FyNiyx5%2BraumsXajdQXqx339SrH2I15ZMbtXvgs0AVYAU2lgf0MkrKIqNUhoqu6nhThVRw8GtFhlZNk4h0O%2Fzvt40A1uQ82DWrO7CBZkGYGlhAneFayu5E6ZaJ5t%2FxckF76LGRFwr5nvFOJnDNECPbzpz0%2FEsixvJZ%2BH4PNQxAxedMlwZiwV5b3HJWJEO0XGu7PZSq&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230428T161552Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLHWVR6FN%2F20230428%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7938d3c9c662b39510e666d322eb173719571f5ffec4959b589bae4d26fee6c2",
  ],
];

function Carousel({ addCb, handleClick }) {
  const [imageI, setImageI] = useState(0);
  const timeBetween = 5000;
  const shared =
    " absolute shadow-md shadow-secondary border-[1px] border-solid rounded-xl width-full";

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
