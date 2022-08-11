
type TurnMsgProps = {
  turn: "White" | "Black",
  handleClick: () => void,
}

const TurnMsg = ({ turn, handleClick }: TurnMsgProps) => {
  console.log('TurnMsg');
  return (
    <div className="TurnMsg">
      <button type="button" onClick={handleClick}>x</button>
      <p>it's the {turn} Player's turn</p>
    </div>
  )
}

export default TurnMsg
