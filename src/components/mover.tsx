import KingAttack from "./kingAtack";
import { AddNotification } from "./TurnMsg";

const Mover = (
  Old: string,
  New: string,
  State: object,
  unhighlight: string[],
  handlePawnRender: any,
  Turn: any,
  handleNotifications: any,
  saveNotifications: any,
) => {
  let newState: any = { ...State };

  // move to an empty spot
  if (newState[New].type == null) {
    [newState[Old], newState[New]] = [newState[New], newState[Old]];
  } else {
    // eat the peice
    let emptySpot = { type: null, highlighted: false };
    [newState[Old], newState[New]] = [emptySpot, newState[Old]];
  }

  // unhighlight after the move
  for (let i in unhighlight) {
    newState[unhighlight[i]].highlighted = false;
  }
  if (newState[New].type == "Pawn" && (New[0] == "1" || New[0] == "8")) {
    handlePawnRender(New, newState[New].color);
  } else if (!KingAttack(newState, Turn, handleNotifications)) {
    // if the king is not under attack then move
    return newState;
  } else {
    return () => AddNotification("the king is under attack", Turn, () => handleNotifications(Turn.id), saveNotifications);
  }
};


export default Mover;
