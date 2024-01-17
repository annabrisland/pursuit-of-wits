

const Square = (props) => {
    return(
        <div style={{position: "absolute", width: 100, height: 100, border:`4px solid black`, backgroundColor: `${props.color}`, boxShadow: `8px 8px 3px ${props.color}`, borderRadius: `16px`, margin: `10px`, top: props.top, left: props.left}}>
            {props.squareNumber}
        </div>
    )
}

export default Square;