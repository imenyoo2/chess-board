
const move: any = (spot: string, dir: 'up' | 'down' | 'right' | 'left', amount: number) => {
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
        newSpot = y[index - (parseInt(newSpot[0]) - 1 < 0?1:0)] + spot[1];
        break;
      case 'right':
        index = x.indexOf(newSpot[1]);
        newSpot = newSpot[0] + x[index + (index + 1 < 8? 1 : 0)];
        break;
      case 'left':
        index = x.indexOf(newSpot[1]);
        newSpot = newSpot[0] + x[index - (index - 1 < 0? 1 : 0)];
        break;
    }
  }
  return newSpot;
}

//move('1a', 'right', 3);
//
const Pawn = (spot: string, state: object, firstmove: boolean) => {
  if (firstmove) {
    
  }
}


const Highlighter = (id: string, State: object) => {
  
}

export default Highlighter
