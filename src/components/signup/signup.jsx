import { Container, Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react"
import { useHistory } from "react-router"

export const SignUp = ({ authService }) => {
    const history = useHistory();

    const [userId, setUserId] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [passwordMessage, setPasswordMessage] = useState();
    const [about, setAbout] = useState();
    const [email, setEmail] = useState();
    const [photoURL, setPhotoURL] = useState();

    const toHome = (user) => {
        history.push({
            pathname: '/',
            state: {
                user
            }
        })
    };

    useEffect(() => {
        authService.me().then((user) =>
            user && toHome(user)
        ).catch(console.error)
    },[ authService ])

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            userId,
            name,
            password,
            about,
            email,
            photoURL,
        }

        authService.signup(data)
            .then(user => user && history.push('/'))
            .catch(alert);
    }

    const onChange = (event) => {
        const { target: { name, value } } = event;
        
        switch (name) {
            case 'userId':
                setUserId(value)
                return;
            case 'name':
                setName(value)
                return
            case 'password':
                setPassword(value)
                checkPassword(name,value)
                return
            case 'confirmPassword':
                setConfirmPassword(value)
                checkPassword(name,value)
                return
            case 'about':
                setAbout(value)
                return
            case 'email':
                setEmail(value)
                return
            case 'photoURL':
                setPhotoURL(value)
                return
            default:
        }
    }

    const checkPassword = (name, value) => {
        switch (name) {
            case 'password':
                comparePassword(value,confirmPassword);
                return
            case 'confirmPassword':
                comparePassword(value,password);
                return
            default:
        }
    }
    
    const comparePassword = (value, compare) => {
        if(value === compare) {
            return setPasswordMessage('비밀번호가 일치합니다.');
        } else {
            return setPasswordMessage('비밀번호가 일치하지 않습니다.');
        } 
    }

    return (
        <Container>
            <Box 
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }} method="POST">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="ID" onChange={onChange} name="userId"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Name" onChange={onChange} name="name"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Password" type="password" onChange={onChange} name="password"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Confirm Password" type="password" onChange={onChange} name="confirmPassword"/><span>{passwordMessage}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="About" onChange={onChange} name="about"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="E-mail" onChange={onChange} name="email"/>
                        </Grid>
                    </Grid>
                    <Button type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Button 
                        fullWidth
                        onClick={ () => history.push('/') }
                    >
                        Home
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}