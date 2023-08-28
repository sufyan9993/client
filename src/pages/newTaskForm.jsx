import { Button, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const NewTaskForm = ({ edit = { isEdit: false }, onAddTask, handleClose }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  })
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(taskData);
    edit.isEdit ? (
      edit.onUpdateTask(taskData)
    ) : onAddTask(taskData);
    setTaskData({
      title: "",
      description: "",
    })
    handleClose()
  };
  useEffect(() => {
    console.log(edit.data.completed);
    edit.isEdit && setTaskData({
      title: edit?.data?.title,
      description: edit?.data?.description,
    })
  }, [])
  return (

    <Stack spacing={2} margin={2}
      component={'form'}
      onSubmit={handleSubmit}
    >
      <TextField required label="title" name="title" value={taskData?.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />

      <TextField required label="description" type="description" name="description" value={taskData?.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} />

      {edit?.data?.completed && <Button onClick={()=>edit.onUpdateTask({completed:false})}>Mark As incomplete</Button>}
      <Button type="submit" variant="contained">submit</Button>
    </Stack>
  );
}

export default NewTaskForm