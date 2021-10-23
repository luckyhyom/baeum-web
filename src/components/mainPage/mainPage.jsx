import { useState, useEffect } from "react";
import { ProfileUpdateForm } from "../profileUpdateForm/profileUpdateForm";
import { TopBar } from "../topBar/topBar";

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

    const changeProfileImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image',file);
        await fileUploader.uploadImage(formData)
        .then(profileImageURL => {
            setUser(user => ({ ...user, ...profileImageURL }))
        });
    }

    const updateProfile = async (data) => {
        await authService.updateProfile(data)
            .then(setUser)
            .then(setErrorMessage(undefined))
            .catch(LoginException);
    }

    return (
        <>
            <TopBar
                user={ user }
                onLogin={ login }
                onLogout={ logout }
                authService={ authService }
                updateProfile={ updateProfile }
                changeProfileImage={ changeProfileImage }
                errorMessage={ errorMessage }
            />
        </>
    )
}