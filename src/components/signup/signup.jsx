import { useEffect } from "react"
import { useHistory } from "react-router"

export const SignUp = ({ authService }) => {
    const history = useHistory();
    const toHome = () => {
        history.push('/')
    }

    useEffect(() => {
        authService.me().then((user) =>
            user && toHome()
        ).catch(error => console.log(console.error(error),'TQ'))
    })

    const onSubmit = () => {

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                userId: <input type="text" name="userId"/>
                name: <input type="text" name="name"/>
                password: <input type="password" name="password"/>
                about: <input type="text" name="about"/>
                email: <input type="text" name="email"/>
                photoURL: <input type="file" name="photoURL"/>
            </form>
        </>
    )
}