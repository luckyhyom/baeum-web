import { Button, AppBar, Box, Toolbar, Typography } from "@mui/material"
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import { useState } from "react";
import { useHistory } from "react-router";
import { Login } from "../login/login";
import { ProfileUpdateForm } from "../profileUpdateForm/profileUpdateForm";
import styles from './topBar.module.css'

export const TopBar = ({ user, onLogin, authService, errorMessage, onLogout, updateProfile, changeProfileImage }) => {
    const history =  useHistory();
    const [myInfoModal, setMyInfoModal] = useState(false);
    const [loginFormModal, setLoginFormModal] = useState(false);

    return (
        <Box>
            <AppBar>
                <Toolbar className={styles.toolbar}>
                    <SnowshoeingIcon/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Baeum
                    </Typography>

                    { user && <ul>
                        <Button className={styles.button} color="inherit" onClick={ onLogout } variant="outlined">Logout</Button>
                        <Button  color="inherit"  onClick={ () => setMyInfoModal(boolean=> !boolean) }>My Info</Button>
                        <div style={{ display: myInfoModal ? 'block':'none' }} >
                            <img src={ user.profileImageURL } style={{ width: '300px', height: '300px', objectFit: 'cover' }}/>
                            <input type="file" onChange={ (event) => changeProfileImage(event) }/>
                            <ProfileUpdateForm 
                                updateProfile={ updateProfile }
                                about={ user.about }/>
                        </div>
                    </ul> }

                    { !user && <ul>
                        <Button className={styles.button} color="inherit" onClick={ () => history.push('/signup') } variant="outlined" >Sign Up</Button>
                        <Button  color="inherit" onClick={ () => setLoginFormModal(boolean => !boolean) } variant="outlined" >Sign In</Button>
                        <div style={{display: loginFormModal ? 'block':'none'}}>
                            <Login
                                onLogin={ onLogin }
                                authService={ authService }
                                errorMessage={ errorMessage }
                            />
                        </div>
                    </ul> }
                </Toolbar>
            </AppBar>
        </Box>
    )
}