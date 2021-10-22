import { Button } from "@mui/material"
import { useState } from "react";
import { useHistory } from "react-router";
import { Login } from "../login/login";
import { ProfileUpdateForm } from "../profileUpdateForm/profileUpdateForm";

export const TopBar = ({ user, onLogin, authService, errorMessage, onLogout, updateProfile, changeProfileImage }) => {
    const history =  useHistory();
    const [myInfoModal, setMyInfoModal] = useState(false);
    const [loginFormModal, setLoginFormModal] = useState(false);

    return (
        <nav>

            { user && <ul>
                <Button onClick={ onLogout }>Logout</Button>
                <Button onClick={ () => setMyInfoModal(boolean=> !boolean) }>My Info</Button>
                <div style={{ display: myInfoModal ? 'block':'none' }} >
                    <img src={ user.profileImageURL } style={{ width: '300px', height: '300px', objectFit: 'cover' }}/>
                    <input type="file" onChange={ (event) => changeProfileImage(event) }/>
                    <ProfileUpdateForm 
                        updateProfile={ updateProfile }
                        about={ user.about }/>
                </div>
            </ul> }

            { !user && <ul>
                <Button onClick={ () => history.push('/signup') } >Sign Up</Button>
                <Button onClick={ () => setLoginFormModal(boolean => !boolean) } >Sign In</Button>
                <div style={{display: loginFormModal ? 'block':'none'}}>
                    <Login
                        onLogin={ onLogin }
                        authService={ authService }
                        errorMessage={ errorMessage }
                    />
                </div>
            </ul> }
        </nav>
    )
}