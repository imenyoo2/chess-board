import { AddNotification } from "./TurnMsg";
import Highlighter from "./highlighter";

// called when the king got attacked
// it blocks the moves of all peices intell the king is free
export default function KingAttack(State: any, Turn: any, handleremove: any) {
  let newState = Object.assign({}, State);
  let kingSpot = "";
  for (let spot in newState) {
    if (newState[spot].type == "King" && newState[spot].color == Turn.turn) {
      kingSpot = spot;
    }
  }

  newState = {
    ...newState,
    [kingSpot]: { ...newState[kingSpot], type: "Rook" },
  };
  let Rooklines: string[] = Highlighter(kingSpot, newState);
  // check if a knight is attacking
  newState = {
    ...newState,
    [kingSpot]: { ...newState[kingSpot], type: "Knight" },
  };
  let Knightlines: string[] = Highlighter(kingSpot, newState);

  // check if a Bishop is attacking
    newState = {
    ...newState,
    [kingSpot]: { ...newState[kingSpot], type: "Bishop" },
  };
  let Bishoplines: string[] = Highlighter(kingSpot, newState);

  // check if a pawn is attacking
    newState = {
    ...newState,
    [kingSpot]: { ...newState[kingSpot], type: "Pawn" },
  };
  let Pawnlines: string[] = Highlighter(kingSpot, newState);

  let RookAttack: boolean = Rooklines.some(
    (spot: string) =>
      State[spot].type == "Rook" || State[spot].type == "Queen"
  );
  let BishopAttack: boolean = Bishoplines.some(
    (spot: string) =>
      State[spot].type == "Bishop" || State[spot].type == "Queen"
  );
  let KnightAttack: boolean = Knightlines.some(
    (spot: string) =>
      State[spot].type == "Knight"
  );
  let PawnAttack: boolean = Pawnlines.some(
    (spot: string) =>
      State[spot].type == "Pawn"
  );

  return RookAttack || BishopAttack || KnightAttack || PawnAttack;
}
