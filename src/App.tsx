import React from 'react';
import logo from './logo.svg';
import './App.css';
import Peice from './components/Peice'
import Highlighter from './components/highlighter';



const initialState: any = {
  '1a': {color: 'White', type:'Rook', highlighted: false},
  '1b': {color: 'White', type:'Knight', highlighted: false},
  '1c': {color: 'White', type:'Bishop', highlighted: false},
  '1d': { type: null, highlighted: false },
  '1e': {color: 'White', type:'King', highlighted: false},
  '1f': {color: 'White', type:'Bishop', highlighted: false},
  '1g': {color: 'White', type:'Knight', highlighted: false},
  '1h': {color: 'White', type:'Rook', highlighted: false},
  '2a': { type: null, highlighted: false },
  '2b': {color: 'White', type:'Pawn', highlighted: false, firstmove: true},
  '2c': {color: 'White', type:'Pawn', highlighted: false, firstmove: true},
  '2d': {color: 'White', type:'Pawn', highlighted: false, firstmove: true},
  '2e': { type: null, highlighted: false },
  '2f': {color: 'White', type:'Pawn', highlighted: false, firstmove: true},
  '2g': {color: 'White', type:'Pawn', highlighted: false, firstmove: true},
  '2h': {color: 'White', type:'Pawn', highlighted: false, firstmove: true},
  '3a': { type: null, highlighted: false },
  '3b': { type: null, highlighted: false },
  '3c': { type: null, highlighted: false },
  '3d': { type: null, highlighted: false },
  '3e': { type: null, highlighted: false },
  '3f': { type: null, highlighted: false },
  '3g': { type: null, highlighted: false },
  '3h': { type: null, highlighted: false },
  '4a': { type: null, highlighted: false },
  '4b': { type: null, highlighted: false },
  '4c': {color: 'White', type:'Pawn', highlighted: false, firstmove: true},
  '4d': { type: null, highlighted: false },
  '4e': { type: null, highlighted: false },
  '4f': { type: null, highlighted: false },
  '4g': {color: 'White', type:'Queen', highlighted: false},
  '4h': { type: null, highlighted: false },
  '5a': {color: 'White', type:'Pawn', highlighted: false, firstmove: true},
  '5b': { type: null, highlighted: false },
  '5c': { type: null, highlighted: false },
  '5d': { type: null, highlighted: false },
  '5e': { type: null, highlighted: false },
  '5f': { type: null, highlighted: false },
  '5g': { type: null, highlighted: false },
  '5h': { type: null, highlighted: false },
  '6a': { type: null, highlighted: false },
  '6b': { type: null, highlighted: false },
  '6c': { type: null, highlighted: false },
  '6d': { type: null, highlighted: false },
  '6e': { type: null, highlighted: false },
  '6f': { type: null, highlighted: false },
  '6g': { type: null, highlighted: false },
  '6h': { type: null, highlighted: false },
  '7a': {color: 'Black', type:'Pawn', highlighted: false, firstmove: true},
  '7b': {color: 'Black', type:'Pawn', highlighted: false, firstmove: true},
  '7c': {color: 'Black', type:'Pawn', highlighted: false, firstmove: true},
  '7d': {color: 'Black', type:'Pawn', highlighted: false, firstmove: true},
  '7e': {color: 'Black', type:'Pawn', highlighted: false, firstmove: true},
  '7f': {color: 'Black', type:'Pawn', highlighted: false, firstmove: true},
  '7g': {color: 'Black', type:'Pawn', highlighted: false, firstmove: true},
  '7h': {color: 'Black', type:'Pawn', highlighted: false, firstmove: true},
  '8a': {color: 'Black', type:'Rook', highlighted: false},
  '8b': {color: 'Black', type:'Knight', highlighted: false},
  '8c': {color: 'Black', type:'Bishop', highlighted: false},
  '8d': {color: 'Black', type:'Queen', highlighted: false},
  '8e': {color: 'Black', type:'King', highlighted: false},
  '8f': {color: 'Black', type:'Bishop', highlighted: false},
  '8g': {color: 'Black', type:'Knight', highlighted: false},
  '8h': {color: 'Black', type:'Rook', highlighted: false},
};

let unhighlightSpots: any = [];

function App() {
  const [State, setState] = React.useState(initialState);
  const handleClick = (id: string) => {
    // get the spots that should be highlighted
    const highlightSpots: any = Highlighter(id, State);
    // get the objects of the spots that should be highlighted
    const highlight = highlightSpots.reduce((ac: any, item: any) => {
      ac[item] = {...State[item], highlighted: !State[item].highlighted}
      return ac
    }, {});

    if (unhighlightSpots.length != 0 && !unhighlightSpots.some((elem: any) => id == elem)){
      const unhighlight = unhighlightSpots.reduce((ac: any, item: any) => {//this should unhighlight the highlighted element
        ac[item] = {...State[item], highlighted: false}
        return ac
      }, {});
      setState({...State, 
                ...unhighlight,
                ...highlight}
              );
    }else{
      setState({...State, ...highlight})
    }
    unhighlightSpots = [...highlightSpots]
  }
  return (
    <Board 
      State={State}
      handleClick={handleClick}
    />
  )
}

function Board({State, handleClick}: any) {
  const squirs:any = []
  let j = true;
  let x = 'abcdefgh'.split('');
  let y = '12345678'
  let x_index = 0;
  let y_index = 7;
  for (let i = 1; i <= 64; i++){
    let id = y[y_index]+x[x_index];
    if (j){
      if (State[id].type){
        squirs.push(<Peice spotColor='Black' 
                      color={State[id].color}
                      type={State[id].type}
                      highlighted={State[id].highlighted}
                      handleClick={() => handleClick(id)}
                    />)
      }else{
        squirs.push(<Peice 
                      spotColor='Black'
                      type={State[id].type}
                      highlighted={State[id].highlighted}
                    />)
      }
      x_index += 1;
      j = false;
    }else{
      if (State[id].type){
        squirs.push(<Peice spotColor='White' 
                      color={State[id].color}
                      type={State[id].type}
                      highlighted={State[id].highlighted}
                      handleClick={() => handleClick(id)}
                    />)
      }else{
        squirs.push(<Peice 
                      spotColor='White'
                      type={State[id].type}
                      highlighted={State[id].highlighted}
                    />)
      }
      j = true;
      x_index += 1;
    }
    if (!(i % 8)){
      x_index = 0;
      y_index -= 1;
      j = !j;
    }
  }

  return (
    <div className='board'>
    {squirs}
    </div>
  );
}

export default App;
