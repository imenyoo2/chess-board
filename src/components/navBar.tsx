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

const Window = styled.div`
  background-color: #100720;
  width: 200px;
  height: 250px;
  position: fixed;
  top: 35px;
  right: 5px;
  overflow: scroll;
  color: white;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

type NavBarType = {
  clicked: boolean;
  handleClick: () => void;
  notifications: any[];
};

export default function NavBar({
  clicked,
  handleClick,
  notifications,
}: NavBarType) {
  return (
    <Navbar>
      <div className="NotificationIcon">
        <Notification onClick={handleClick} />
        {clicked && <NotificationWindow notifications={notifications} />}
      </div>
    </Navbar>
  );
}

type NotificationWindowType = {
  notifications: any[];
};

const NotificationWindow = ({ notifications }: NotificationWindowType) => {
  console.log(notifications);
  return <Window>{notifications}</Window>;
};
