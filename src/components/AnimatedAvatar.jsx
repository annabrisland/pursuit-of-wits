import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';
import { motion } from "framer-motion";

const AnimatedAvatar = ({ seed, top, left, visibility}) => {

  const svg = createAvatar( botttsNeutral, { seed, scale:80, size:80, radius: 50 });

  return (<motion.div 
  animate={{ x: left, y: top }}
  transition={{ duration: 1 }}
  dangerouslySetInnerHTML={{ __html: svg }}
  style={{
    position: "absolute",
    top: 22,
    left: 22,
    width: 80,
    height: 80,
    border: "1px solid black",
    borderRadius: "90px",
    visibility: visibility,
  }}
   />);
};

export default AnimatedAvatar;
