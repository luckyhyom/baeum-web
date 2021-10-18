import { useState } from "react"
import { Link } from "react-router-dom"

export const Login = ({ onLogin, errorMessage }) => {
    const [userId, setUserId] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const onSubmit = (e) => {
        e.preventDefault()
        onLogin(userId, password)
    }

    function onChange(event) {
        const {
            target: { name, value }
        } = event;
        switch (name) {
            case 'userId':
                setUserId(value)
                return
            case 'password':
                setPassword(value)
                return
            default:
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                id: <input type="text" name="userId" onChange={onChange} /> <br></br>
                pw: <input type="password" name="password" onChange={onChange}/>
                <input type="submit" value="submit"/>
            </form>
            <Link to="/signup">sign up</Link>
            { errorMessage && <p style={{ color: 'red' }}>{ errorMessage }</p> }
        </>
    )
}