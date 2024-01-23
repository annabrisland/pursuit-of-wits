const Square = (props) => {
  return (
    <div className="square"
      style={{
        position: "absolute",
        width: 100,
        height: 100,
        border: `3px solid #1a1a1a`,
        backgroundColor: `${props.color}`,
        borderRadius: `16px`,
        margin: `10px`,
        top: props.top,
        left: props.left,
      }}
    >
      {props.squareNumber}
    </div>
  );
};

export default Square;
