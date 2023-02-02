import styled from "styled-components";
import { ReactComponent as X } from "../svgs/x-symbol.svg";

const Container = styled.div`
  background-color: #355764;
  padding: 5px;
  svg {
    height: 10px;
    width: 10px;
  }
  .X {
    display: flex;
    justify-content: flex-end;
  }
  p {
    margin: 0;
  }
`;

export default function SavedNotificationWindow({ value, handleClick }: any) {
  return (
    <Container>
      <div className="X">
        <div onClick={handleClick} >
          <X />
        </div>
      </div>
      <p>{value}</p>
    </Container>
  );
}
