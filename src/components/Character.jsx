import { useState } from 'react'
import { useAnimate } from "framer-motion"

function Character(props){

    const [scope, animate] = useAnimate();
    const [position, setPosition] = useState({
        top: 20,
        left: 30
    });

    const [squareNum, setSquareNum] = useState(0);
    
    console.log(props.diffX, props.diffY)
    const endPos = position.left + props.diffX;

    return (<div 
                style={{ position: "absolute", top: position.top, left: position.left, width: 32, height: 80, backgroundColor: "blue", border: "3px solid black" }} 
                ref={scope} 
                onClick={() => 
                    {animate(position.left, endPos, { duration: 2, onUpdate: latest => (setPosition({top: position.top, left: latest}))})}}> </div>)
}

export default Character;