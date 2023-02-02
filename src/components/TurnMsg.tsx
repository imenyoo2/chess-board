type TurnMsgProps = {
  handleClick: () => void;
  children: any;
};

const TurnMsg = ({ handleClick, children }: TurnMsgProps) => {
  setTimeout(handleClick, 2999);
  return (
    <div className="TurnMsg">
      <button type="button" onClick={handleClick}>
        x
      </button>
      <p>{children}</p>
    </div>
  );
};

type addNotifResult = {
  turn: "White" | "Black";
  notifications: any[];
  id: number;
};

const AddNotification = (
  msg: any,
  Turn: any,
  handleRemove: any,
  saveNotification: any
) => {
  saveNotification(msg);
  return {
    ...Turn,
    notifications: [
      ...Turn.notifications,
      [
        Turn.id,
        <TurnMsg key={Turn.id.toString()} handleClick={handleRemove}>
          {msg}
        </TurnMsg>,
      ],
    ],
    id: Turn.id + 1,
  };
};

export default TurnMsg;
export { AddNotification };
