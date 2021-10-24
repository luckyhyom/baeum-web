import { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"

export const Login = ({ onLogin, errorMessage }) => {
    const [body, setBody] = useState({ userId: '', password: '' })

    const onSubmit = (event) => {
        event.preventDefault();
        onLogin(body.userId, body.password);
    }

    function onChange(event) {
        setBody(body => ({
            ...body,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <>
            <Box component="form"
                onSubmit={ onSubmit }
                method="POST"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6">
                    Sign in
                </Typography>
                <TextField label="ID" variant="outlined" name="userId" onChange={onChange} fullWidth margin="normal" />
                <TextField label="Password" variant="outlined"  type="password" name="password" onChange={onChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>Sign in</Button>
            </Box>
            { errorMessage && <p style={{ color: 'red' }}>{ errorMessage }</p> }
        </>
    )
}