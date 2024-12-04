import styled from "styled-components";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-top: 2.5rem;

  h1 {
    font-size: 1.875rem; /* text-3xl */
    font-weight: bold;
    margin: 2rem 0;
    text-align: center;
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 3.5rem; /* gap-y-4 and gap-x-14 */
  justify-content: center;
  overflow-y: scroll;
  margin-top: 1.25rem;
  height: 50vh;

  @media (min-width: 640px) {
    height: 80vh;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  margin-top: 17vh;

  @media (min-width: 640px) {
    margin-top: 30vh;
  }

  p {
    font-size: 1rem;

    a {
      color: #6366f1; /* Indigo 500 */
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const CompleteTask = () => {
  const tasks = useSelector(selectAllTasks);
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <Container>
      <Header>
        <h1>Completed Tasks</h1>
      </Header>
      {completedTasks.length > 0 ? (
        <TaskList>
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              startDate={task.startDate}
              endDate={task.endDate}
              status={task.status}
            />
          ))}
        </TaskList>
      ) : (
        <EmptyState>
          <p>
            No tasks found. <Link to="/addTask">Add a new task</Link>
          </p>
        </EmptyState>
      )}
    </Container>
  );
};

export default CompleteTask;
