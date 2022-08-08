import { ReactComponent as BlackQueen } from "../svgs/BlackQueen.svg";
import { ReactComponent as WhiteQueen } from "../svgs/WhiteQueen.svg";
import { ReactComponent as BlackRook } from "../svgs/BlackRook.svg";
import { ReactComponent as WhiteRook } from "../svgs/WhiteRook.svg";
import { ReactComponent as BlackBishop } from "../svgs/BlackBishop.svg";
import { ReactComponent as WhiteBishop } from "../svgs/WhiteBishop.svg";
import { ReactComponent as BlackKnight } from "../svgs/BlackKnight.svg";
import { ReactComponent as WhiteKnight } from "../svgs/WhiteKnight.svg";

type PawnChangerType = {
  handleClick: (id: string, newObj: Object) => void;
  color: "White" | "Black";
  id: string,
};

const objects = {
  WhiteQueen: { color: "White", type: "Queen", highlighted: false },
  WhiteKnight: { color: "White", type: "Knight", highlighted: false },
  WhiteBishop: { color: "White", type: "Bishop", highlighted: false },
  WhiteRook: { color: "White", type: "Rook", highlighted: false },
  BlackQueen: { color: "Black", type: "Queen", highlighted: false },
  BlackKnight: { color: "Black", type: "Knight", highlighted: false },
  BlackBishop: { color: "Black", type: "Bishop", highlighted: false },
  BlackRook: { color: "Black", type: "Rook", highlighted: false },
}

const PawnChanger = ({ handleClick, color, id }: PawnChangerType) => {
  if (color == "White") {
    return (
      <>
        <div className="choices-container">
          <a onClick={() => handleClick(id, objects.WhiteQueen)}>
            <div>
              <WhiteQueen />
            </div>
          </a>
          <a onClick={() => handleClick(id, objects.WhiteRook)}>
            <div>
              <WhiteRook />
            </div>
          </a>
          <a onClick={() => handleClick(id, objects.WhiteBishop)}>
            <div>
              <WhiteBishop />
            </div>
          </a>
          <a onClick={() => handleClick(id, objects.WhiteKnight)}>
            <div>
              <WhiteKnight />
            </div>
          </a>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="choices-container">
          <a onClick={() => handleClick(id, objects.BlackQueen)}>
            <div>
              <BlackQueen />
            </div>
          </a>
          <a onClick={() => handleClick(id, objects.BlackRook)}>
            <div>
              <BlackRook />
            </div>
          </a>
          <a onClick={() => handleClick(id, objects.BlackBishop)}>
            <div>
              <BlackBishop />
            </div>
          </a>
          <a onClick={() => handleClick(id, objects.BlackKnight)}>
            <div>
              <BlackKnight />
            </div>
          </a>
        </div>
      </>
    );
  }
};

export default PawnChanger;
