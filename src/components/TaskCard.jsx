import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import { toggleTaskCompleted, removeTask, updateTask } from "../store/taskSlice";

// Styled Components
const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  width: 20rem;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StatusBadge = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  ${({ status }) => {
    switch (status.toLowerCase()) {
      case "completed":
        return `
          background: #d1fae5;
          color: #065f46;
        `;
      case "in progress":
        return `
          background: #bfdbfe;
          color: #1d4ed8;
        `;
      case "pending":
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const DateSection = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #374151;
`;

const DateColumn = styled.div`
  text-align: left;

  p:first-child {
    font-weight: bold;
  }
`;

const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s;

  ${({ variant }) => {
    switch (variant) {
      case "complete":
        return `
          background: #d1fae5;
          color: #065f46;
        `;
      case "update":
        return `
          background: #3b82f6;
          color: white;
          &:hover {
            background: #2563eb;
          }
        `;
      case "remove":
        return `
          background: #f87171;
          color: white;
          &:hover {
            background: #dc2626;
          }
        `;
      default:
        return `
          background: #e5e7eb;
          color: #374151;
        `;
    }
  }}
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 25rem;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background 0.3s;
  }

  .cancel {
    background: #e5e7eb;
    color: #374151;
    &:hover {
      background: #d1d5db;
    }
  }

  .save {
    background: #3b82f6;
    color: white;
    &:hover {
      background: #2563eb;
    }
  }
`;

// TaskCard Component
const TaskCard = ({ id, title, description, startDate, endDate, status }) => {
  const [complete, setComplete] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title,
    description,
    startDate,
    endDate,
    status,
  });

  const dispatch = useDispatch();

  const handleToggleCompleted = () => {
    dispatch(toggleTaskCompleted(id));
    setComplete(true);
  };

  const handleRemoveTask = () => {
    dispatch(removeTask(id));
  };

  const handleUpdateTask = () => {
    dispatch(updateTask({ id, ...updatedTask }));
    setIsUpdateModalOpen(false);
  };

  const getDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString();
  };

  return (
    <Card>
      <StatusBadge status={status}>
        <h1>{title}</h1>
      </StatusBadge>
      <Description>{description}</Description>
      <DateSection>
        <DateColumn>
          <p>Start Date</p>
          <p>{getDate(startDate)}</p>
        </DateColumn>
        <DateColumn>
          <p>End Date</p>
          <p>{getDate(endDate)}</p>
        </DateColumn>
      </DateSection>
      <Actions>
        <Button variant="complete" onClick={handleToggleCompleted}>
          {complete ? "Completed" : status}
        </Button>
        <Button variant="update" onClick={() => setIsUpdateModalOpen(true)}>
          Update
        </Button>
        <Button variant="remove" onClick={handleRemoveTask}>
          Remove
        </Button>
      </Actions>

      {isUpdateModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>Update Task</h2>
            <ModalInput
              type="text"
              value={updatedTask.title}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, title: e.target.value })
              }
            />
            <ModalTextarea
              value={updatedTask.description}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, description: e.target.value })
              }
            ></ModalTextarea>
            <ModalActions>
              <button
                className="cancel"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </button>
              <button className="save" onClick={handleUpdateTask}>
                Save
              </button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </Card>
  );
};

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default TaskCard;
