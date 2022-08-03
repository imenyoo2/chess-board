import React from 'react';
import logo from './logo.svg';
import './App.css';
import Peice from './components/Peice'



const initialState: any = {
  '1a': {color: 'White', type:'Rook', highlighted: false},
  '1b': {color: 'White', type:'Knight', highlighted: false},
  '1c': {color: 'White', type:'Bishop', highlighted: false},
  '1d': {color: 'White', type:'Queen', highlighted: false},
  '1e': {color: 'White', type:'King', highlighted: false},
  '1f': {color: 'White', type:'Bishop', highlighted: false},
  '1g': {color: 'White', type:'Knight', highlighted: false},
  '1h': {color: 'White', type:'Rook', highlighted: false},
  '2a': {color: 'White', type:'Pawn', highlighted: false},
  '2b': {color: 'White', type:'Pawn', highlighted: false},
  '2c': {color: 'White', type:'Pawn', highlighted: false},
  '2d': {color: 'White', type:'Pawn', highlighted: false},
  '2e': {color: 'White', type:'Pawn', highlighted: false},
  '2f': {color: 'White', type:'Pawn', highlighted: false},
  '2g': {color: 'White', type:'Pawn', highlighted: false},
  '2h': {color: 'White', type:'Pawn', highlighted: false},
  '3a': null,
  '3b': null,
  '3c': null,
  '3d': null,
  '3e': null,
  '3f': null,
  '3g': null,
  '3h': null,
  '4a': null,
  '4b': null,
  '4c': null,
  '4d': null,
  '4e': null,
  '4f': null,
  '4g': null,
  '4h': null,
  '5a': null,
  '5b': null,
  '5c': null,
  '5d': null,
  '5e': null,
  '5f': null,
  '5g': null,
  '5h': null,
  '6a': null,
  '6b': null,
  '6c': null,
  '6d': null,
  '6e': null,
  '6f': null,
  '6g': null,
  '6h': null,
  '7a': {color: 'Black', type:'Pawn', highlighted: false},
  '7b': {color: 'Black', type:'Pawn', highlighted: false},
  '7c': {color: 'Black', type:'Pawn', highlighted: false},
  '7d': {color: 'Black', type:'Pawn', highlighted: false},
  '7e': {color: 'Black', type:'Pawn', highlighted: false},
  '7f': {color: 'Black', type:'Pawn', highlighted: false},
  '7g': {color: 'Black', type:'Pawn', highlighted: false},
  '7h': {color: 'Black', type:'Pawn', highlighted: false},
  '8a': {color: 'Black', type:'Rook', highlighted: false},
  '8b': {color: 'Black', type:'Knight', highlighted: false},
  '8c': {color: 'Black', type:'Bishop', highlighted: false},
  '8d': {color: 'Black', type:'Queen', highlighted: false},
  '8e': {color: 'Black', type:'King', highlighted: false},
  '8f': {color: 'Black', type:'Bishop', highlighted: false},
  '8g': {color: 'Black', type:'Knight', highlighted: false},
  '8h': {color: 'Black', type:'Rook', highlighted: false},
};

let highlightedSpots: any = [];

function App() {
  const [State, setState] = React.useState(initialState);
  const handleClick = (id: string) => {
    if (highlightedSpots.length != 0 && !highlightedSpots.some((elem: any) => id == elem)){
      const prevhighlighted = highlightedSpots.reduce((ac: any, item: any) => {//this should unhighlight the highlighted element
        ac[item] = {...State[item], highlighted: false}
        return ac
      }, {});
      setState({...State, 
                [id]: {...State[id], highlighted: !State[id].highlighted},
                ...prevhighlighted}
              );
    }else{
      setState({...State, [id]: {...State[id], highlighted: !State[id].highlighted}})
    }
    highlightedSpots = [id]
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
      if (State[id]){
        squirs.push(<Peice spotColor='Black' 
                      color={State[id].color}
                      type={State[id].type}
                      highlighted={State[id].highlighted}
                      handleClick={() => handleClick(id)}
                    />)
      }else{
        squirs.push(<Peice 
                      spotColor='Black'
                    />)
      }
      x_index += 1;
      j = false;
    }else{
      if (State[id]){
        squirs.push(<Peice spotColor='White' 
                      color={State[id].color}
                      type={State[id].type}
                      highlighted={State[id].highlighted}
                      handleClick={() => handleClick(id)}
                    />)
      }else{
        squirs.push(<Peice 
                      spotColor='White'
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
