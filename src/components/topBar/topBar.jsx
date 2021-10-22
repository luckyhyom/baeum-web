import { Button } from "@mui/material"
import { useState } from "react";
import { useHistory } from "react-router";
import { Login } from "../login/login";

export const TopBar = ({ isUser, onLogin, authService, errorMessage, onLogout }) => {
    const history =  useHistory();
    const [myInfoModal, setMyInfoModal] = useState(false);
    const [loginFormModal, setLoginFormModal] = useState(false);

    const logout = () => {
        onLogout();
    }

    return (
        <nav>
            { isUser && <ul>
                <Button onClick={ logout }>Logout</Button>
                <Button onClick={ () => setMyInfoModal(boolean=> !boolean) }>My Info</Button>
                <div style={{ display: myInfoModal ? 'block':'none' }} >
                    <img src="" alt=""/>
                    <input type="text" name="about" defaultValue={'s'}/>
                </div>
            </ul> }

            { !isUser && <ul>
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
            {/* 
                Logout
                My Info
                    Box
                        profile Image
                            update
                        about
                            update
            */}
            {/* 
                Sign In
                    Login Form
                Sign Up
            */}
        </nav>
    )
}