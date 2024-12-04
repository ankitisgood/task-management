import styled from "styled-components";
import { useState } from "react";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";
import { IoFilterSharp, IoClose } from "react-icons/io5";

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: #6366f1;
  border-radius: 0.75rem;
  cursor: pointer;

  svg {
    color: white;
    font-size: 1.25rem;
  }
`;

const TaskCount = styled.div`
  color: #6366f1;
  font-weight: 600;
`;

const FiltersContainer = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  margin-top: 2rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: column-reverse;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const FilterTitle = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  color: ${(props) => (props.sort ? "#6366f1" : "#4F46E5")};
`;

const Input = styled.input`
  background-color: #e5e7eb;
  padding: 0.5rem;
  border-radius: 0.75rem;
  width: 60vw;
  appearance: none;

  @media (min-width: 640px) {
    width: auto;
  }
`;

const Select = styled.select`
  background-color: #e5e7eb;
  padding: 0.5rem;
  border-radius: 0.75rem;
`;

const TasksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  overflow-y: scroll;
  margin-top: 1rem;
  height: 80vh;
`;

const NoTasksMessage = styled.div`
  text-align: center;
  margin-top: 17vh;

  @media (min-width: 640px) {
    margin-top: 30vh;
  }

  a {
    color: #6366f1;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AllTasks = () => {
  const tasks = useSelector(selectAllTasks);
  const [startDate, setStartDate] = useState(null);
  const [toggle, settoggle] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.startDate);
    const isDateInRange =
      (!startDate || taskDate >= startDate) &&
      (!endDate || taskDate <= endDate);
    const isStatusMatch =
      statusFilter === "All" || task.status === statusFilter;
    const isSearchMatch =
      !searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase());

    return isDateInRange && isStatusMatch && isSearchMatch;
  });

  return (
    <Container>
      <Title>Task Board</Title>
      <Header>
        <ToggleButton onClick={() => settoggle(!toggle)}>
          {toggle ? <IoClose /> : <IoFilterSharp />}
        </ToggleButton>
        <TaskCount>All Task ({filteredTasks.length})</TaskCount>
      </Header>
      <FiltersContainer visible={toggle}>
        <FilterGroup>
          <FilterTitle>Filter</FilterTitle>
          <Input
            type="date"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
          <Input
            type="date"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </FilterGroup>
        <FilterGroup>
          <FilterTitle sort>Sort</FilterTitle>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </FilterGroup>
        <FilterGroup>
          <FilterTitle>Search</FilterTitle>
          <Input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FilterGroup>
      </FiltersContainer>
      {filteredTasks.length > 0 ? (
        <TasksWrapper>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              startDate={task.startDate}
              endDate={task.endDate}
              status={task.status}
              assignee={task.assignee}
            />
          ))}
        </TasksWrapper>
      ) : (
        <NoTasksMessage>
          <p>
            No tasks found.{" "}
            <Link to="/addTask">Add a new task</Link>
          </p>
        </NoTasksMessage>
      )}
    </Container>
  );
};

export default AllTasks;
