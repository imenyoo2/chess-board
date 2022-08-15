import { AddNotification } from "./TurnMsg";
import Highlighter from "./highlighter";

// called when the king got attacked
// it blocks the moves of all peices intell the king is free
export default function KingAttack(State: any, Turn: any, handleremove: any) {
  let newState = Object.assign({}, State);
  let kingSpot = '';
  for (let spot in newState){
    if (newState[spot].type == "King" && newState[spot].color == Turn.turn) {
      kingSpot = spot
    }
  }

  newState = {...newState, [kingSpot]: {...newState[kingSpot], type: "Queen"}};
  let lines: any = Highlighter(kingSpot, newState);
  lines = lines.filter((spot: string) => spot != kingSpot);
  return lines.some((spot: string) =>  newState[spot].type == "Queen")
}
