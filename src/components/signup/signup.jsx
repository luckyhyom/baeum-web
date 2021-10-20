import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router"

export const SignUp = ({ authService }) => {
    const history = useHistory();

    const [userId, setUserId] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
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

    return (
        <>
            <form onSubmit={onSubmit} method="POST">
                userId: <input type="text" onChange={onChange} name="userId"/>
                name: <input type="text" onChange={onChange} name="name"/>
                password: <input type="password" onChange={onChange} name="password"/>
                about: <input type="text" onChange={onChange} name="about"/>
                email: <input type="text" onChange={onChange} name="email"/>
                photoURL: <input type="text" onChange={onChange} name="photoURL"/>
                {/* photoURL: <input type="file" onChange={onChange} name="photoURL"/> */}
                <button type="submit">submit</button>
            </form>
        </>
    )
}