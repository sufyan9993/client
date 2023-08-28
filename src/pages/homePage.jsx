import { Delete, DoneAll, Edit } from "@mui/icons-material"
import { Box, Button, Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/config"

const HomePage = ({ tasks, fetchTasksData, onEditTask }) => {
    const handleMarkCompleted = taskId => {
        axios.put(`${BASE_URL}/api/tasks/updateTask/${taskId}`, { completed: true })
            .then(res => {
                console.log('mark as completed', res.data)
                fetchTasksData()
            })
            .catch(err => console.log(err.message))
    };

    const handleDelete = taskId => {
        axios.delete(`${BASE_URL}/api/tasks/deleteTask/${taskId}`)
            .then((res) => {
                console.log('task deleted successfully')
                fetchTasksData()
            })
            .catch(err => console.log(err.message))
    };

    useEffect(() => {      
        fetchTasksData()
    }, [])
    return (
        <Box component={'table'} width='80%' bgcolor={'whiteSmoke'}>
            <TableHead>
                <TableRow >
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center" >Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    tasks.map((item, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell width={'33%'} align="center" >{item.title}</TableCell>
                                <TableCell width={'33%'} align="center" >{item.description}</TableCell>
                                <TableCell width={'33%'} align="center"  >  
                                    <Stack direction={'row'} justifyContent={'space-around'} >
                                        <Box>
                                            {
                                                item.completed ? <DoneAll /> :
                                                    <Button onClick={(e) => { handleMarkCompleted(item._id) }} >Mark As Completed</Button>
                                            }
                                        </Box>
                                        <Button onClick={() => handleDelete(item._id)}><Delete /></Button>
                                        <Button onClick={() => { onEditTask(item._id) }}><Edit /></Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Box>
    )
}
export default HomePage

