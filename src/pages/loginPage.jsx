import { AccountCircle } from "@mui/icons-material"
import { Button, Stack, TextField, Typography, Box } from "@mui/material"
import { useState } from "react"

const LoginPage = ({ onLogin }) => {

  const [FormValues, setFormValues] = useState({
    UserName: '',
    Password: '',
  })

  const submitHandler = async (e) => {
    onLogin()

  }
  return (
    <Box 
    width={'300px'} 
    margin="20px auto" 
    textAlign='center' 
    component={'form'}
    onSubmit={submitHandler}
    
    >
      <AccountCircle fontSize="large" />
      <Typography component={'h1'} variant="h4" >Login</Typography>
      <Stack spacing={2} margin={2}>
        <TextField required label="UserName" name="username" value={FormValues?.UserName} onChange={(e) => setFormValues({ ...FormValues, UserName: e.target.value })} />

        <TextField required label="Password" type="password" name="password" value={FormValues?.Password} onChange={(e) => setFormValues({ ...FormValues, Password: e.target.value })} />
        
        <Button type="submit" variant="contained" fullWidth>Submit</Button>
      </Stack>
    </Box>
  );
}

export default LoginPage
