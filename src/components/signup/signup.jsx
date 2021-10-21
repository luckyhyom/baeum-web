import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router"
import Button from '@mui/material/Button';
import SignUp2 from "./singup.mui";

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
            .catch(console.log);
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
        <>
            <form onSubmit={onSubmit} method="POST">
                userId: <input type="text" onChange={onChange} name="userId"/>
                name: <input type="text" onChange={onChange} name="name"/>
                password: <input type="password" onChange={onChange} name="password"/>
                Confirm password: <input type="password" onChange={onChange} name="confirmPassword"/><span>{passwordMessage}</span>
                about: <input type="text" onChange={onChange} name="about"/>
                email: <input type="text" onChange={onChange} name="email"/>
                <button type="submit">submit</button>
            </form>
            <Button>no</Button>
        </>
    )
}