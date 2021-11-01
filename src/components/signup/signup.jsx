import { Container, Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { checkLength } from "../../util/LengthChecker"

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

    const [validationUserIdMessage, setValidationUserIdMessage] = useState();
    const [validationNameMessage, setValidationNameMessage] = useState();
    const [validationPasswordMessage, setValidationPasswordMessage] = useState();
    const [validationAboutMessage, setValidationAboutMessage] = useState();
    const [validationEmailMessage, setValidationEmailMessage] = useState();

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
            .catch(alert('회원가입 양식을 지켜주세요!'));
    }

    const onChange = (event) => {
        const { target: { name, value } } = event;
        
        switch (name) {
            case 'userId':
                setUserId(value);
                checkLength(value.length, 8, 14, setValidationUserIdMessage)
                return;
            case 'name':
                setName(value);
                checkLength(value.length, 2, 6, setValidationNameMessage)
                return
            case 'password':
                setPassword(value);
                checkPassword(name,value);
                checkLength(value.length, 9, 18, setValidationPasswordMessage)
                return
            case 'confirmPassword':
                setConfirmPassword(value);
                checkPassword(name,value);
                return
            case 'about':
                setAbout(value)
                checkLength(value.length, 8, 50, setValidationAboutMessage)
                return
            case 'email':
                setEmail(value)
                checkEmail(value, setValidationEmailMessage);
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

    function checkEmail(email, setState) {
        const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if(reg.test(email)) {
            return setState(undefined)
        }
        return setState('이메일 형식이 아닙니다.')
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
                            <TextField fullWidth label="ID" onChange={onChange} name="userId" placeholder="8~14 길이" required />
                            <Typography variant="body2" sx={{ color: "red" }}>{ validationUserIdMessage }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Name" onChange={onChange} name="name" placeholder="2~6 길이"  required />
                            <Typography variant="body2" sx={{ color: "red" }}>{ validationNameMessage }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Password" type="password" onChange={onChange} name="password" placeholder="9~18 길이" required />
                            <Typography variant="body2" sx={{ color: "red" }}>{ validationPasswordMessage }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Confirm Password" type="password" onChange={onChange} name="confirmPassword" placeholder="9~18 길이" required />
                            <Typography variant="body2">{ passwordMessage }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="About" onChange={onChange} name="about" placeholder="8~50 길이" required />
                            <Typography variant="body2" sx={{ color: "red" }}>{ validationAboutMessage }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="E-mail" onChange={onChange} name="email" placeholder="email 형식만 입력 가능합니다." required />
                            <Typography variant="body2" sx={{ color: "red" }}>{ validationEmailMessage }</Typography>
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