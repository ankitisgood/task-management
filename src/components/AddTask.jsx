import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import styled from 'styled-components';

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0;
  text-align: center;
  color: #000;
`;

const FormContainer = styled.div`
  display: grid;
  place-items: center;
`;

const Form = styled.form`
  width: 100%;
  margin-top: 3rem;
  max-width: 40rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  background-color: #e9ecf3;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #3b3b3b;

  &:focus {
    outline: none;
    background-color: #f5f5f5;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background-color: #e9ecf3;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #3b3b3b;

  &:focus {
    outline: none;
    background-color: #f5f5f5;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  background-color: #e9ecf3;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #3b3b3b;

  &:focus {
    outline: none;
    background-color: #f5f5f5;
  }
`;

const Select = styled.select`
  width: 100%;
  background-color: #e9ecf3;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #3b3b3b;

  &:focus {
    outline: none;
    background-color: #f5f5f5;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #6366f1;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #818cf8;
  }
`;

const AddTask = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: null,
    status: 'Pending',
    assignee: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  const handleStartDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      setFormData({
        ...formData,
        startDate: date,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serializableFormData = {
      ...formData,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate ? formData.endDate.toISOString() : null,
    };
    console.log(serializableFormData);
    dispatch(addTask(serializableFormData));
    setFormData({
      title: '',
      description: '',
      startDate: new Date(),
      endDate: null,
      status: 'Pending',
      assignee: '',
    });
  };

  return (
    <Container>
      <Title>Add New Task</Title>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <div style={{ width: '100%' }}>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Task Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div style={{ width: '100%' }}>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                placeholder="Task Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div style={{ flex: 1 }}>
              <Label htmlFor="startDate">Start Date</Label>
              <StyledDatePicker
                selected={formData.startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="endDate">End Date</Label>
              <StyledDatePicker
                selected={formData.endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div style={{ width: '100%' }}>
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
            </div>
          </FormGroup>
          <SubmitButton type="submit">Add</SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default AddTask;
