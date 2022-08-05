import React from 'react';
import './Peice.css'

import { ReactComponent as BlackKing } from '../svgs/BlackKing.svg';
import { ReactComponent as WhiteKing } from '../svgs/WhiteKing.svg';
import { ReactComponent as BlackQueen } from '../svgs/BlackQueen.svg';
import { ReactComponent as WhiteQueen } from '../svgs/WhiteQueen.svg';
import { ReactComponent as BlackRook } from '../svgs/BlackRook.svg';
import { ReactComponent as WhiteRook } from '../svgs/WhiteRook.svg';
import { ReactComponent as BlackBishop } from '../svgs/BlackBishop.svg';
import { ReactComponent as WhiteBishop } from '../svgs/WhiteBishop.svg';
import { ReactComponent as BlackKnight } from '../svgs/BlackKnight.svg';
import { ReactComponent as WhiteKnight } from '../svgs/WhiteKnight.svg';
import { ReactComponent as BlackPawn } from '../svgs/BlackPawn.svg';
import { ReactComponent as WhitePawn } from '../svgs/WhitePawn.svg';


type ComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>



type ComponentsType = {
"BlackKing": ComponentType,
"WhiteKing": ComponentType,
"BlackQueen": ComponentType,
"WhiteQueen": ComponentType,
"BlackRook": ComponentType,
"WhiteRook": ComponentType,
"BlackBishop": ComponentType,
"WhiteBishop": ComponentType,
"BlackKnight": ComponentType,
"WhiteKnight": ComponentType,
"BlackPawn": ComponentType,
"WhitePawn": ComponentType,
}

//TODO: change any
const components: any = {
"BlackKing": <BlackKing/>,
"WhiteKing": <WhiteKing/>,
"BlackQueen": <BlackQueen/>,
"WhiteQueen": <WhiteQueen/>,
"BlackRook": <BlackRook/>,
"WhiteRook": <WhiteRook/>,
"BlackBishop": <BlackBishop/>,
"WhiteBishop": <WhiteBishop/>,
"BlackKnight": <BlackKnight/>,
"WhiteKnight": <WhiteKnight/>,
"BlackPawn": <BlackPawn/>,
"WhitePawn": <WhitePawn/>
};

type PropType = {
  spotColor: 'White' | 'Black',
  color?: 'White' | 'Black',
  type: 'King' | 'Queen' | 'Rook' | 'Bishop' | 'Knight' | 'Pawn' | null,
  highlighted?: boolean,
  handleClick?: () => void,
}

const Peice = ({spotColor, color, type, highlighted, handleClick}: PropType) => {
  if (type){
    return <a onClick={handleClick}><div className={'spot '+spotColor+(highlighted?' highlighted':'')}>{components[color+type]}</div></a>
  } else {
    return <div className={'spot '+spotColor+(highlighted?' highlighted':'')}></div>
  }
}


export default Peice
