import React from 'react'
import {useState, useEffect} from 'react'
import { motion, animate } from 'framer-motion'

const Loading = ({shellRows}) => {

  return (
  <>
    {shellRows.map((row, index) => {
      return (
        <motion.div animate={{opacity: .4}} transition={{ease: 'easeInOut', repeat: Infinity, repeatDelay: 1}} key={index + row} className='flex flex-col container my-5 h-12 w-[750px] rounded-lg border border-black bg-gray-200 opacity-75'>
          <motion.div initial={{width: 0}} animate={{width: 750}} transition={{ease: 'easeIn', duration: 10}} className={`bg-blue-500 h-12`}></motion.div>
        </motion.div>
      );
    })}
  </>
  );
}

export default Loading;