import React, { useState } from 'react';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import NewTaskForm from './pages/newTaskForm';
import { Box, Button, Modal, Stack } from '@mui/material';
import { BASE_URL } from './utils/config';
import axios from 'axios'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [tasks, setTasks] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsEdit(false)
    setOpen(false)
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    padding: 4,
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleAddTask = newTask => {
    axios.post(`${BASE_URL}/api/tasks/addTask`, { ...newTask }).then((res) => {
      console.log("task added", res.data)
      fetchTasksData()
    }).catch((err) => {
      console.error('Error adding task')
    })
  };

  const fetchTasksData = () => {
    axios.get(`${BASE_URL}/api/tasks/getTasks`).then(res => {
      setTasks(res.data)
    }).catch(err => {
      console.log(err);
    })
  }
  const handleEditTask = taskId => {
    axios.get(`${BASE_URL}/api/tasks/getTask/${taskId}`)
      .then(res => {
        console.log('fetch the task details', res.data);
        setValues(res.data)
        setIsEdit(true)
        handleOpen()
      })
      .catch(err => console.log(err.message))
  }
  const updateTask = updateData => {
    axios.put(`${BASE_URL}/api/tasks/updateTask/${values._id}`, updateData)
      .then(res => {
        console.log('update successfully')
        fetchTasksData()
      })
      .catch(err => console.log(err.message))

  }

  return (
    <div>
      {loggedIn ? (
        <Stack spacing={2} alignItems={'center'}>
          <Button onClick={handleOpen}>Add Task</Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <NewTaskForm handleClose={handleClose} edit={{ isEdit, data: values, onUpdateTask: updateTask }} onAddTask={handleAddTask} />
            </Box>
          </Modal>
          <HomePage
            fetchTasksData={fetchTasksData}
            tasks={tasks}
            onEditTask={handleEditTask}
          />
        </Stack>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
