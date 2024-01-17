import { useState } from 'react'
import { useAnimate } from "framer-motion"

function Character(props){

    const [scope, animate] = useAnimate();
    const [top, setTop] = useState(0);
    
    return (<div 
                style={{ position: "absolute", top: `${40 + top}px`, left: 152, width: 32, height: 96, backgroundColor: "blue", border: "3px solid black" }} 
                ref={scope} onClick={() => {animate(top, (top + 172), { duration: 2, onUpdate: latest => (setTop(latest))})}}> </div>)
}

export default Character;