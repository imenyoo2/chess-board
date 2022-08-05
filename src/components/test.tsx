

const move: any = (spot: string, dir: 'up' | 'down' | 'right' | 'left', amount: number) => {
  if(!spot){
    return false;
  }
  let x = 'abcdefgh';
  let y = '12345678';
  let newSpot = spot;
  let index = 0;
  for (let i = 0; i < amount; i++){
    switch (dir){
      case 'up':
        index = y.indexOf(newSpot[0]);
        newSpot = y[index + (parseInt(newSpot[0]) + 1 < 8?1:0)] + spot[1];
        break;
      case 'down':
        index = y.indexOf(newSpot[0]);
        // TODO: change parseInt with index
        newSpot = y[index - (parseInt(newSpot[0]) - 1 < 0?1:0)] + spot[1];
        break;
      case 'right':
        index = x.indexOf(newSpot[1]);
        newSpot = newSpot[0] + x[index + (index + 1 < 8? 1 : 0)];
        break;
      case 'left':
        index = x.indexOf(newSpot[1]);
        newSpot = newSpot[0] + x[index - (index - 1 > -1? 1 : 0)];
        break;
    }
  }
  if (newSpot !== spot){
    return newSpot;
  }else{
    return false;
  }
}


//move('1a', 'right', 3);

// pawn -----------------
const Pawn = (spot: string, firstmove: boolean) => {
  let hilightSpots = [];
  if (firstmove) {
    hilightSpots.push(move(spot, 'up', 1));
    hilightSpots.push(move(spot, 'up', 2));
  }else{
    hilightSpots.push(move(spot, 'up', 1));
  }
  hilightSpots.push(spot);
  return hilightSpots;
};

// King ------------------------
const King = (spot: string) => {
  let hilightSpots = [];
  hilightSpots.push(
    spot,
    move(spot, 'up', 1),
    move(spot, 'down', 1),
    move(spot, 'right', 1),
    move(spot, 'left', 1),
    move(move(spot, 'up', 1), 'left', 1),
    move(move(spot, 'down', 1), 'left', 1),
    move(move(spot, 'down', 1), 'right', 1),
    move(move(spot, 'up', 1), 'right', 1),
  )
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  return hilightSpots
}

//Knight ----------------------
const Knight = (spot: string) => {
  let hilightSpots = [];
  hilightSpots.push(
    spot,
    move(move(spot, 'up', 2), 'right', 1),
    move(move(spot, 'up', 2), 'left', 1),
    move(move(spot, 'down', 2), 'left', 1),
    move(move(spot, 'down', 2), 'right', 1),
    move(move(spot, 'left', 2), 'up', 1),
    move(move(spot, 'left', 2), 'down', 1),
    move(move(spot, 'right', 2), 'down', 1),
    move(move(spot, 'right', 2), 'up', 1),
  )
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  return hilightSpots;
}

//Bishop
const Bishop = (spot: string) => {
  let lines = [];
  let hilightSpots = [];
  let newSpot = spot;
  hilightSpots.push(newSpot);

  // up-right loop
  while (true){
    newSpot = move(move(newSpot, 'up', 1), 'right', 1);
    if (newSpot){
      hilightSpots.push(newSpot);
    }else{
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];
  // up-left loop
  newSpot = spot;
  while (true){
    newSpot = move(move(newSpot, 'up', 1), 'left', 1);
    if (newSpot){
      hilightSpots.push(newSpot);
    }else{
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  // down-left loop
  newSpot = spot;
  while (true){
    newSpot = move(move(newSpot, 'down', 1), 'left', 1);
    if (newSpot){
      hilightSpots.push(newSpot);
    }else{
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  // down-right loop
  newSpot = spot;
  while (true){
    newSpot = move(move(newSpot, 'down', 1), 'right', 1);
    if (newSpot){
      hilightSpots.push(newSpot);
    }else{
      break;
    }
  }
  hilightSpots = hilightSpots.filter((spot) => spot.length == 2);
  lines.push(hilightSpots);
  hilightSpots = [];

  return lines;
}

const Highlighter = (id: string, State: object) => {
  let newState: any = {...State};
  let hilightSpots: string[] = [];
  switch (newState[id].type){
    case 'Pawn':
      hilightSpots = Pawn(id, newState[id].firstmove);
      if (newState[id].color == "White"){
        return hilightSpots.filter((spot: any) => newState[spot].type == null || newState[spot].color == "Black" || spot == id)
      }else{
        return hilightSpots.filter((spot: any) => newState[spot] == null || newState[spot].color == "White")
      };
    case 'King':
      hilightSpots = King(id);
      if (newState[id].color == "White"){
        return hilightSpots.filter((spot: any) => newState[spot].type == null || newState[spot].color == "Black" || spot == id)
      }else{
        return hilightSpots.filter((spot: any) => newState[spot] == null || newState[spot].color == "White")
      };
    case 'Knight':
      hilightSpots = Knight(id);
      if (newState[id].color == "White"){
        return hilightSpots.filter((spot: any) => newState[spot].type == null || newState[spot].color == "Black" || spot == id)
      }else{
        return hilightSpots.filter((spot: any) => newState[spot] == null || newState[spot].color == "White")
      }
    case 'Bishop':
      let lines = Bishop(id);
      lines = lines.map((hilightSpots) => {
        let pause: boolean = false;
        if (newState[id].color == "White"){
          return hilightSpots.filter(
            (spot: any) => {
              if (!pause){
                console.log('pause = false');
                if (newState[spot].color && spot !== id){
                  pause = true;
                  return false;
                }
                return newState[spot].type == null || spot == id || newState[spot].color == "Black"
              }else{
                console.log('pause = true');
                return false
              }
            }
          )
        }else{
          let pause: boolean = false;
          return hilightSpots.filter(
            (spot: any) => {
              if (!pause){
                if (newState[spot].color == "White"){
                  pause = true;
                  return false;
                }
                return newState[spot].type == null || spot == id
              }else{
                return false
              }
            }
          )
        }
      })
      return lines.reduce((arr, subarr) => [...arr, ...subarr], []);
      
      }
}

export default Highlighter
