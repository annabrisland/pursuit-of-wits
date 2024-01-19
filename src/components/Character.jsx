import { useState, useEffect } from 'react'
import { animate, motion } from "framer-motion"

function Character({top, left, visibility}){

    return (<motion.div 

                animate={{ x:left, y:top}}
                transition={{duration: 1}}
                style={{ position: "absolute", top: 20, left: 30, width: 32, height: 80, backgroundColor: "blue", border: "3px solid black", visibility: visibility }} 
                    > </motion.div>)
}

export default Character;