import { useState, useEffect } from "react";
import { Login } from "../login/login";
import { ProfileUpdateForm } from "../profileUpdateForm/profileUpdateForm";

export const MainPage = ({ authService, fileUploader }) => {
    const [user, setUser] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        authService.me()
        .then(setUser)
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

    const imageChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        await fileUploader.uploadImage(formData)
        .then(result => {
            setUser(user => ({ ...user, profileImageURL: result.location }))
        });
    }

    const updateProfile = async (data) => {
        await authService.updateProfile(data)
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
            {
                user && <img src={user.profileImageURL} style={{ width: '300px', height: '300px', objectFit: 'cover' }}/>
            }
            {
                user && <ProfileUpdateForm 
                    updateProfile={updateProfile}
                    about={user.about}
                    />
            }
        </>
    )
}