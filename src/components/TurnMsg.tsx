type TurnMsgProps = {
  turn: "White" | "Black";
  handleClick: () => void;
};

const TurnMsg = ({ turn, handleClick }: TurnMsgProps) => {
  setTimeout(handleClick, 2999);
  console.log("TurnMsg");
  return (
    <div className="TurnMsg">
      <button type="button" onClick={handleClick}>
        x
      </button>
      <p>it's the {turn} Player's turn</p>
    </div>
  );
};

type addNotifResult = {
  turn: "White" | "Black";
  notifications: any[];
  id: number;
};

const AddNotification = (type: any, Turn: any, handleRemove: any) => {
  if (type == "turn") {
    return {
      ...Turn,
      notifications: [
        ...Turn.notifications,
        [
          Turn.id,
          <TurnMsg
            key={Turn.id.toString()}
            turn={Turn.turn}
            handleClick={handleRemove}
          />,
        ],
      ],
      id: Turn.id + 1,
    };
  }
};

export default TurnMsg;
export { AddNotification };
