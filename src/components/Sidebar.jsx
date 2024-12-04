import styled from "styled-components";
import { GrTask } from "react-icons/gr";
import { MdDashboard, MdOutlineTaskAlt, MdAddTask, MdPendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  background-color: #6366f1; /* Indigo 500 */
  min-height: 100vh;
  width: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Roboto', sans-serif;

  @media (min-width: 640px) {
    min-height: 100vh;
    width: 19rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  height: 4rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;

  span {
    display: none;

    @media (min-width: 640px) {
      display: block;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: start;
`;

const NavList = styled.ul`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const NavItem = styled(Link)`
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.125rem; /* text-lg */
  color: #d1d5db; /* text-gray-300 */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  &:hover {
    color: #4b5563; /* text-gray-700 */
  }

  span {
    display: none;

    @media (min-width: 640px) {
      display: block;
    }
  }
`;

const Icon = styled.div`
  font-size: 2rem;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Header>
        <GrTask />
        <span>Task Manager</span>
      </Header>
      <Nav>
        <NavList>
          <NavItem to="/">
            <Icon>
              <MdDashboard />
            </Icon>
            <span>Dashboard</span>
          </NavItem>
          <NavItem to="/completeTask">
            <Icon>
              <MdOutlineTaskAlt />
            </Icon>
            <span>Completed Tasks</span>
          </NavItem>
          <NavItem to="/pendingTask">
            <Icon>
              <MdPendingActions />
            </Icon>
            <span>Pending Tasks</span>
          </NavItem>
          <NavItem to="/inProgressTask">
            <Icon>
              <GrInProgress />
            </Icon>
            <span>In Progress Tasks</span>
          </NavItem>
          <NavItem to="/addTask">
            <Icon>
              <MdAddTask />
            </Icon>
            <span>Add New Tasks</span>
          </NavItem>
        </NavList>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
