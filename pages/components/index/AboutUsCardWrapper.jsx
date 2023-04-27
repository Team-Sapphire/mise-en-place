import { motion } from "framer-motion";

function AboutUsCardWrapper(props) {
  return (
    <motion.div
      className="relative w-[calc(100%-4em)] ml-8 mt-4 bg-base-200 rounded-lg p-2 h-[75%] z-[-1] flex flex-col items-center justify-between"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "tween", duration: 1 }}
    >
      {props.children}
    </motion.div>
  );
}

export default AboutUsCardWrapper;
