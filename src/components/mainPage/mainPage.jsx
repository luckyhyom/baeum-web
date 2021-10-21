import { useState, useEffect } from "react";
import { Login } from "../login/login";

export const MainPage = ({ authService, fileUploader }) => {
    const [user, setUser] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        authService.me().then(setUser)
        .then(setErrorMessage(undefined))
        .catch(console.error)
    }, [ authService ])

    const login = async (userId, password) => {
        await authService.login(userId,password)
            .then(setUser)
            .then(setErrorMessage(undefined))
            .catch(LoginException);
    };
    
    const logout = async () => {
        await authService.logout()
            .then(setUser(undefined))
            .catch(LoginException)
    }

    const LoginException = (error) => {
        setErrorMessage(error.message)
    }

    const imageChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        fileUploader.uploadImage(formData);
    }

    return (
        <>
            {
                user ?
                <div onClick={logout}>Logout</div>
                : <Login
                    onLogin={ login }
                    authService={ authService }
                    errorMessage={ errorMessage }
                />
            }

            {
                user && <input type="file" onChange={imageChange}/>
            }
        </>
    )
}