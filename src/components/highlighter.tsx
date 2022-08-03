
const move: any = (spot: string, dir: 'up' | 'down' | 'right' | 'left', amount: number) => {
  let x = 'abcdefgh';
  let y = '12345678';
  let newSpot = '';
  for (let i = 0; i < amount; i++){
    switch (dir){
      case 'up':
        let index = y.indexOf(spot[0]);
        newSpot = y[index + (index+1 < 8?1:0)];
        break;
      case 'down':
        let index = y.indexOf(spot[0]);
        newSpot = y[index + (index+1 < 8?1:0)];
        break;
    }
  }
}

const Highlighter = (id: string, State: object) => {
  
}

export default Highlighter
