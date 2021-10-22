import { useState } from "react"
import {Button, TextField} from "@mui/material"

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
            <form onSubmit={ onSubmit }>
                <TextField id="outlined-basic" label="ID" variant="outlined" name="userId" onChange={onChange} fullWidth margin="normal" />
                <TextField id="outlined-basic" label="Password" variant="outlined"  type="password" name="password" onChange={onChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" fullWidth>submit</Button>
            </form>
            { errorMessage && <p style={{ color: 'red' }}>{ errorMessage }</p> }
        </>
    )
}