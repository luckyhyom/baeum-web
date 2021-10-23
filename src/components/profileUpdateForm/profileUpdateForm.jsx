import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";

export const ProfileUpdateForm = ({ updateProfile, about }) => {
    const [body, setBody] = useState({ about: about })

    const onSubmit = (event) => {
        event.preventDefault();
        alert('about is updated!')
        updateProfile(body)
    }

    const onChange = (event) => {
        setBody(body => ({
            ...body,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <>
            <form onSubmit={ onSubmit } style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TextField label="About" name="about" onChange={ onChange } variant="outlined" defaultValue={ about } />
                <Button type="submit" fullWidth>update</Button>
            </form>
        </>
    )
}