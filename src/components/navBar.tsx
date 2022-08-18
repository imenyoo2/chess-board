import styled from "styled-components";
import { ReactComponent as Notification } from "../svgs/notification.svg";

const Navbar = styled.div`
  background-color: #b8f1b0;
  width: 100%;
  height: 30px;
  display: flex
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
`;

export default function NavBar() {
  return (
    <Navbar>
      <div className="NotificationIcon">
        <Notification />
      </div>
    </Navbar>
  );
}
