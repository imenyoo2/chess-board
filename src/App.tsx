import React from "react";
import "./App.css";
import Peice from "./components/Peice";
import Highlighter from "./components/highlighter";
import Mover from "./components/mover";
import PawnChanger from "./components/PawnChanger";
import { AddNotification } from "./components/TurnMsg";
import KingAttack from "./components/kingAtack";

const initialState: any = {
  "1a": { color: "White", type: "Rook", highlighted: false },
  "1b": { color: "White", type: "Knight", highlighted: false },
  "1c": { color: "White", type: "Bishop", highlighted: false },
  "1d": { type: null, highlighted: false },
  "1e": { color: "White", type: "King", highlighted: false },
  "1f": { color: "White", type: "Bishop", highlighted: false },
  "1g": { color: "White", type: "Knight", highlighted: false },
  "1h": { color: "White", type: "Rook", highlighted: false },
  "2a": { type: null, highlighted: false },
  "2b": { color: "White", type: "Pawn", highlighted: false },
  "2c": { color: "White", type: "Pawn", highlighted: false },
  "2d": { color: "White", type: "Pawn", highlighted: false },
  "2e": { type: null, highlighted: false },
  "2f": { color: "White", type: "Pawn", highlighted: false },
  "2g": { color: "White", type: "Pawn", highlighted: false },
  "2h": { color: "White", type: "Pawn", highlighted: false },
  "3a": { type: null, highlighted: false },
  "3b": { type: null, highlighted: false },
  "3c": { type: null, highlighted: false },
  "3d": { type: null, highlighted: false },
  "3e": { type: null, highlighted: false },
  "3f": { type: null, highlighted: false },
  "3g": { type: null, highlighted: false },
  "3h": { type: null, highlighted: false },
  "4a": { type: null, highlighted: false },
  "4b": { type: null, highlighted: false },
  "4c": { color: "White", type: "Pawn", highlighted: false, firstmove: true },
  "4d": { type: null, highlighted: false },
  "4e": { type: null, highlighted: false },
  "4f": { type: null, highlighted: false },
  "4g": { color: "White", type: "Queen", highlighted: false },
  "4h": { type: null, highlighted: false },
  "5a": { color: "White", type: "Pawn", highlighted: false, firstmove: true },
  "5b": { type: null, highlighted: false },
  "5c": { type: null, highlighted: false },
  "5d": { type: null, highlighted: false },
  "5e": { type: null, highlighted: false },
  "5f": { type: null, highlighted: false },
  "5g": { type: null, highlighted: false },
  "5h": { type: null, highlighted: false },
  "6a": { type: null, highlighted: false },
  "6b": { type: null, highlighted: false },
  "6c": { type: null, highlighted: false },
  "6d": { type: null, highlighted: false },
  "6e": { type: null, highlighted: false },
  "6f": { type: null, highlighted: false },
  "6g": { type: null, highlighted: false },
  "6h": { type: null, highlighted: false },
  "7a": { color: "Black", type: "Pawn", highlighted: false },
  "7b": { color: "Black", type: "Pawn", highlighted: false },
  "7c": { color: "Black", type: "Pawn", highlighted: false },
  "7d": { color: "Black", type: "Pawn", highlighted: false },
  "7e": { color: "Black", type: "Pawn", highlighted: false },
  "7f": { color: "Black", type: "Pawn", highlighted: false },
  "7g": { color: "Black", type: "Pawn", highlighted: false },
  "7h": { color: "Black", type: "Pawn", highlighted: false },
  "8a": { color: "Black", type: "Rook", highlighted: false },
  "8b": { color: "Black", type: "Knight", highlighted: false },
  "8c": { color: "Black", type: "Bishop", highlighted: false },
  "8d": { color: "Black", type: "Queen", highlighted: false },
  "8e": { color: "Black", type: "King", highlighted: false },
  "8f": { color: "Black", type: "Bishop", highlighted: false },
  "8g": { color: "Black", type: "Knight", highlighted: false },
  "8h": { color: "Black", type: "Rook", highlighted: false },
};

let unhighlightSpots: any = [];
let ClickedSpot = "";

type turnType = {
  turn: "White" | "Black";
  notifications: any[];
  id: number;
};

function App() {
  const [State, setState] = React.useState(initialState);

  const [isReplace, setIsReplace]: any = React.useState(false);

  const [Turn, setTurn] = React.useState<any>({
    turn: "White",
    notifications: [],
    id: 0,
  });

  // handles the clicks coming from the taken spots and calls the Highlighter
  const handleClick = (id: string) => {
    // only allow the player to click when its their turn, if not add a notification
    if (State[id].color != Turn.turn) {
      setTurn(
        AddNotification(`it's the ${Turn.turn} player's turn`, Turn, () =>
          handleRemoveNotification(Turn.id)
        )
      );
    } else {
      // get the spots that should be highlighted
      const highlightSpots: any = Highlighter(id, State);

      // get the objects of the spots that should be highlighted
      let highlight = highlightSpots.reduce((ac: any, item: any) => {
        ac[item] = { ...State[item], highlighted: true };
        return ac;
      }, {});

      // the condition of clicking the same peice again
      if (
        // this thing just compare highlightSpots and unhighlightSpots
        highlightSpots.every((item: any) =>
          unhighlightSpots.some(
            (unhighlightSpot: string) => item == unhighlightSpot
          )
        )
      ) {
        // generating the objs of highlighted peices
        highlight = highlightSpots.reduce((ac: any, item: any) => {
          ac[item] = { ...State[item], highlighted: !State[item].highlighted };
          return ac;
        }, {});
      }

      // check if the unhighlighted spots (else is the initial state)
      if (unhighlightSpots.length != 0) {
        // filtering the peices that should be highlighted from unhighlightSpots
        unhighlightSpots = unhighlightSpots.filter(
          (spot: string) => !highlightSpots.some((item: string) => item == spot)
        );

        // generating the objs of unhighlighted peices
        const unhighlight = unhighlightSpots.reduce((ac: any, item: any) => {
          //this should unhighlight the highlighted element
          ac[item] = { ...State[item], highlighted: false };
          return ac;
        }, {});

        //changing the state
        setState({ ...State, ...highlight, ...unhighlight });
      } else {
        setState({ ...State, ...highlight });
      }
      unhighlightSpots = [...highlightSpots]; // update the next unhighlightSpots
      ClickedSpot = id; // set the clicked spot to use it for the Old arg
    }
  };

  const handleMove = (New: string) => {
    let newState = Mover(
      ClickedSpot,
      New,
      State,
      unhighlightSpots,
      handlePawnRender,
      Turn,
      handleRemoveNotification
    );
    // check if the king is under attack
    if (typeof newState == 'object') {
      setState(newState);
      // change the turn if peice got moved
      if (New != ClickedSpot) {
        setTurn({
          ...Turn,
          turn: State[ClickedSpot].color == "White" ? "Black" : "White",
        });
      }
    } else {
      if (New == ClickedSpot) {
        newState = { ...State };
        for (let i in unhighlightSpots) {
          newState[unhighlightSpots[i]].highlighted = false;
        }
        setState(newState);
      } else {
        setTurn(newState());
      }
    }
  };

  const handlePawnChange = (id: string, newObj: Object) => {
    setState({ ...State, [id]: newObj });
    setIsReplace(false);
  };

  const handlePawnRender = (id: string, color: "White" | "Black") => {
    setIsReplace({ id: [id], color: [color] });
  };

  const handleRemoveNotification = (id: number) => {
    setTurn((prevValue: any) => {
      return {
        ...prevValue,
        notifications: prevValue.notifications.filter(
          (arr: any) => arr[0] != id
        ),
      };
    });
  };

  if (isReplace) {
    return (
      <div className="container">
        <Board
          State={State}
          handleClick={handleClick}
          handleMove={handleMove}
        />
        <PawnChanger
          handleClick={handlePawnChange}
          color={isReplace.color}
          id={isReplace.id}
        />
      </div>
    );
  } else {
    // we don't want to modify the original so the ranking system don't break
    // also we map and to filter only the components
    let reversed = [...Turn.notifications].reverse().map((arr) => arr[1]);
    return (
      <>
        <Board
          State={State}
          handleClick={handleClick}
          handleMove={handleMove}
        />
        <div className="notifications">{reversed}</div>
      </>
    );
  }
}

function Board({ State, handleClick, handleMove }: any) {
  const squirs: any = [];
  let j = true;
  let x = "abcdefgh".split("");
  let y = "12345678";
  let x_index = 0;
  let y_index = 7;
  for (let i = 1; i <= 64; i++) {
    let id = y[y_index] + x[x_index];
    if (j) {
      if (State[id].type && State[id].highlighted == false) {
        squirs.push(
          <Peice
            spotColor="Black"
            color={State[id].color}
            type={State[id].type}
            highlighted={State[id].highlighted}
            handleClick={() => handleClick(id)}
          />
        );
      } else if (State[id].type && State[id].highlighted == true) {
        squirs.push(
          <Peice
            spotColor="Black"
            color={State[id].color}
            type={State[id].type}
            highlighted={State[id].highlighted}
            handleClick={() => handleMove(id)}
          />
        );
      } else {
        squirs.push(
          <Peice
            spotColor="Black"
            type={State[id].type}
            highlighted={State[id].highlighted}
            handleClick={() => handleMove(id)}
          />
        );
      }
      x_index += 1;
      j = false;
    } else {
      if (State[id].type && State[id].highlighted == false) {
        squirs.push(
          <Peice
            spotColor="White"
            color={State[id].color}
            type={State[id].type}
            highlighted={State[id].highlighted}
            handleClick={() => handleClick(id)}
          />
        );
      } else if (State[id].type && State[id].highlighted == true) {
        squirs.push(
          <Peice
            spotColor="White"
            color={State[id].color}
            type={State[id].type}
            highlighted={State[id].highlighted}
            handleClick={() => handleMove(id)}
          />
        );
      } else {
        squirs.push(
          <Peice
            spotColor="White"
            type={State[id].type}
            highlighted={State[id].highlighted}
            handleClick={() => handleMove(id)}
          />
        );
      }
      j = true;
      x_index += 1;
    }
    if (!(i % 8)) {
      x_index = 0;
      y_index -= 1;
      j = !j;
    }
  }

  return <div className="board">{squirs}</div>;
}

export default App;
