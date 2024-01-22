import React, {useState, useEffect} from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-male-sprites";

import { motion } from "framer-motion";

const AnimatedAvatar = ({ seed , top, left, visibility}) => {

  const svg = createAvatar( style, { seed, scale:80, size:80, radius: 0, backgroundColor: ["b6e3f4"], backgroundType: ["gradientLinear"] });

  return (<motion.div 
  animate={{ x: left, y: top }}
  transition={{ duration: 1 }}
  dangerouslySetInnerHTML={{ __html: svg }}
  style={{
    position: "absolute",
    top: 20,
    left: 20,
    width: 80,
    height: 80,
    border: "3px solid black",
    visibility: visibility,
  }}
   />);
};

export default AnimatedAvatar;
