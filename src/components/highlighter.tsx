const move: any = (
  spot: string,
  dir: "up" | "down" | "right" | "left",
  amount: number
) => {
  if (!spot) {
    return false;
  }
  let x = "abcdefgh";
  let y = "12345678";
  let newSpot: any = spot; // set to any because type script throw an error when
  // when we do newSpot[0]
  let index = 0;
  for (let i = 0; i < amount; i++) {
    switch (dir) {
      case "up":
        index = y.indexOf(newSpot[0]);
        newSpot = parseInt(newSpot[0]) + 1 < 9 ? y[index + 1] + spot[1] : false;
        break;
      case "down":
        index = y.indexOf(newSpot[0]);
        // TODO: change parseInt with index
        newSpot = parseInt(newSpot[0]) - 1 > 0 ? y[index - 1] + spot[1] : false;
        break;
      case "right":
        index = x.indexOf(newSpot[1]);
        newSpot = index + 1 < 8 ? newSpot[0] + x[index + 1] : false;
        break;
      case "left":
        index = x.indexOf(newSpot[1]);
        newSpot = index - 1 > -1 ? newSpot[0] + x[index - 1] : false;
        break;
    }
  }
  if (newSpot !== spot) {
    return newSpot;
  } else {
    return false;
  }
};

//move('1a', 'right', 3);

// pawn -----------------
const Pawn = (spot: string, op: "up" | "down", initLine: "2" | "7") => {
  let pawnlines = [];
  let hilightSpots: any = [];
  hilightSpots.push(spot);
  if (spot[0] == initLine) {
    hilightSpots.push(move(spot, op, 1));
    hilightSpots.push(move(spot, op, 2));
  } else {
    hilightSpots.push(move(spot, op, 1));
  }
  pawnlines.push(hilightSpots);
  hilightSpots = [];
  hilightSpots.push(move(move(spot, op, 1), "right", 1));
  hilightSpots.push(move(move(spot, op, 1), "left", 1));
  pawnlines.push(hilightSpots);
  return pawnlines;
};

// King ------------------------
const King = (spot: string) => {
  let hilightSpots = [];
  hilightSpots.push(
    spot,
    move(spot, "up", 1),
    move(spot, "down", 1),
    move(spot, "right", 1),
    move(spot, "left", 1),
    move(move(spot, "up", 1), "left", 1),
    move(move(spot, "down", 1), "left", 1),
    move(move(spot, "down", 1), "right", 1),
    move(move(spot, "up", 1), "right", 1)
  );
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  return hilightSpots;
};

//Knight ----------------------
const Knight = (spot: string) => {
  let hilightSpots = [];
  hilightSpots.push(
    spot,
    move(move(spot, "up", 2), "right", 1),
    move(move(spot, "up", 2), "left", 1),
    move(move(spot, "down", 2), "left", 1),
    move(move(spot, "down", 2), "right", 1),
    move(move(spot, "left", 2), "up", 1),
    move(move(spot, "left", 2), "down", 1),
    move(move(spot, "right", 2), "down", 1),
    move(move(spot, "right", 2), "up", 1)
  );
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  return hilightSpots;
};

//Bishop
const Bishop = (spot: string) => {
  let lines = [];
  let hilightSpots = [];
  let newSpot = spot;
  hilightSpots.push(newSpot);

  // up-right loop
  while (true) {
    newSpot = move(move(newSpot, "up", 1), "right", 1);
    if (newSpot) {
      hilightSpots.push(newSpot);
    } else {
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];
  // up-left loop
  newSpot = spot;
  while (true) {
    newSpot = move(move(newSpot, "up", 1), "left", 1);
    if (newSpot) {
      hilightSpots.push(newSpot);
    } else {
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  // down-left loop
  newSpot = spot;
  while (true) {
    newSpot = move(move(newSpot, "down", 1), "left", 1);
    if (newSpot) {
      hilightSpots.push(newSpot);
    } else {
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  // down-right loop
  newSpot = spot;
  while (true) {
    newSpot = move(move(newSpot, "down", 1), "right", 1);
    if (newSpot) {
      hilightSpots.push(newSpot);
    } else {
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  return lines;
};

//Rook
const Rook = (spot: string) => {
  let lines = [];
  let hilightSpots = [];
  let newSpot = spot;
  hilightSpots.push(newSpot);

  // up-right loop
  while (true) {
    newSpot = move(newSpot, "up", 1);
    if (newSpot) {
      hilightSpots.push(newSpot);
    } else {
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];
  // up-left loop
  newSpot = spot;
  while (true) {
    newSpot = move(newSpot, "down", 1);
    if (newSpot) {
      hilightSpots.push(newSpot);
    } else {
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  // down-left loop
  newSpot = spot;
  while (true) {
    newSpot = move(newSpot, "right", 1);
    if (newSpot) {
      hilightSpots.push(newSpot);
    } else {
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  // down-right loop
  newSpot = spot;
  while (true) {
    newSpot = move(newSpot, "left", 1);
    if (newSpot) {
      hilightSpots.push(newSpot);
    } else {
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  return lines;
};

const Highlighter = (id: string, State: object) => {
  let newState: any = State;
  let hilightSpots: string[][] = [];
  switch (newState[id].type) {
    case "Pawn":
      if (newState[id].color == "White") {
        hilightSpots = Pawn(id, "up", "2");
        let pause: boolean = false;
        return [
          ...hilightSpots[0].filter((spot: string) => {
            if (!pause) {
              if (newState[spot].color && spot !== id) {
                pause = true;
                return false;
              }
              return (
                newState[spot].type == null ||
                newState[spot].color == "Black" ||
                spot == id
              );
            } else {
              return false;
            }
          }),
          ...hilightSpots[1].filter(
            (spot: string) => spot && newState[spot].color == "Black"
          ),
        ];
      } else {
        hilightSpots = Pawn(id, "down", "7");
        let pause: boolean = false;
        return [
          ...hilightSpots[0].filter((spot: string) => {
            if (!pause) {
              if (newState[spot].color && spot !== id) {
                pause = true;
                return false;
              }
              return (
                newState[spot].type == null ||
                newState[spot].color == "White" ||
                spot == id
              );
            } else {
              return false;
            }
          }),
          ...hilightSpots[1].filter(
            (spot: string) => spot && newState[spot].color == "White"
          ),
        ];
      }
    case "King":
      hilightSpots = King(id);
      if (newState[id].color == "White") {
        return hilightSpots.filter(
          (spot: any) =>
            newState[spot].type == null ||
            newState[spot].color == "Black" ||
            spot == id
        );
      } else {
        return hilightSpots.filter(
          (spot: any) =>
            newState[spot].type == null ||
            newState[spot].color == "White" ||
            spot == id
        );
      }
    case "Knight":
      hilightSpots = Knight(id);
      if (newState[id].color == "White") {
        return hilightSpots.filter(
          (spot: any) =>
            newState[spot].type == null ||
            newState[spot].color == "Black" ||
            spot == id
        );
      } else {
        return hilightSpots.filter(
          (spot: any) =>
            newState[spot].type == null ||
            newState[spot].color == "White" ||
            spot == id
        );
      }
    case "Bishop":
      let lines = Bishop(id);
      lines = lines.map((hilightSpots) => {
        if (newState[id].color == "White") {
          let pause: boolean = false;
          return hilightSpots.filter((spot: any) => {
            if (!pause) {
              if (newState[spot].color == "White" && spot !== id) {
                pause = true;
                return false;
              } else if (newState[spot].color == "Black") {
                pause = true;
                return true;
              }
              return (
                newState[spot].type == null ||
                spot == id ||
                newState[spot].color == "Black"
              );
            } else {
              return false;
            }
          });
        } else {
          let pause: boolean = false;
          return hilightSpots.filter((spot: any) => {
            if (!pause) {
              if (newState[spot].color == "Black" && spot !== id) {
                pause = true;
                return false;
              } else if (newState[spot].color == "White") {
                pause = true;
                return true;
              }
              return (
                newState[spot].type == null ||
                spot == id ||
                newState[spot].color == "White"
              );
            } else {
              return false;
            }
          });
        }
      });
      return lines.reduce((arr, subarr) => [...arr, ...subarr], []);
    case "Rook":
      let RookLines = Rook(id);
      RookLines = RookLines.map((hilightSpots) => {
        if (newState[id].color == "White") {
          let pause: boolean = false;
          return hilightSpots.filter((spot: any) => {
            if (!pause) {
              if (newState[spot].color == "White" && spot !== id) {
                pause = true;
                return false;
              } else if (newState[spot].color == "Black") {
                pause = true;
                return true;
              }

              return (
                newState[spot].type == null ||
                spot == id ||
                newState[spot].color == "Black"
              );
            } else {
              return false;
            }
          });
        } else {
          let pause: boolean = false;
          return hilightSpots.filter((spot: any) => {
            if (!pause) {
              if (newState[spot].color == "Black" && spot !== id) {
                pause = true;
                return false;
              } else if (newState[spot].color == "White") {
                pause = true;
                return true;
              }

              return (
                newState[spot].type == null ||
                spot == id ||
                newState[spot].color == "White"
              );
            } else {
              return false;
            }
          });
        }
      });
      return RookLines.reduce((arr, subarr) => [...arr, ...subarr], []);
    case "Queen":
      let QueenLines = [...Rook(id), ...Bishop(id)];
      QueenLines = QueenLines.map((hilightSpots) => {
        if (newState[id].color == "White") {
          let pause: boolean = false;
          return hilightSpots.filter((spot: any) => {
            if (!pause) {
              if (newState[spot].color == "White" && spot !== id) {
                pause = true;
                return false;
              } else if (newState[spot].color == "Black") {
                pause = true;
                return true;
              }
              return (
                newState[spot].type == null ||
                spot == id ||
                newState[spot].color == "Black"
              );
            } else {
              return false;
            }
          });
        } else {
          let pause: boolean = false;
          return hilightSpots.filter((spot: any) => {
            if (!pause) {
              if (newState[spot].color == "Black" && spot !== id) {
                pause = true;
                return false;
              } else if (newState[spot].color == "White") {
                pause = true;
                return true;
              }
              return (
                newState[spot].type == null ||
                spot == id ||
                newState[spot].color == "White"
              );
            } else {
              return false;
            }
          });
        }
      });
      return QueenLines.reduce((arr, subarr) => [...arr, ...subarr], []);
  }
};

export default Highlighter;
