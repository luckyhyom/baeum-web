import { Button, AppBar, Box, Toolbar, Typography, Modal } from "@mui/material"
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import { useState } from "react";
import { useHistory } from "react-router";
import { Login } from "../login/login";
import { ProfileUpdateForm } from "../profileUpdateForm/profileUpdateForm";
import styles from './topBar.module.css'

const signInStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};  

export const TopBar = ({ user, onLogin, authService, errorMessage, onLogout, updateProfile, changeProfileImage }) => {
    const history =  useHistory();
    const [myInfoModal, setMyInfoModal] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 


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
                        <Button  color="inherit"  onClick={ () => setMyInfoModal(boolean=> !boolean) } variant="outlined" >My Info</Button>
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
                        <Button  color="inherit" onClick={ handleOpen } variant="outlined" >Sign In</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={signInStyle}>
                            <Login
                                onLogin={ onLogin }
                                authService={ authService }
                                errorMessage={ errorMessage }
                            />
                            </Box>
                        </Modal>
                    </ul> }
                </Toolbar>
            </AppBar>
        </Box>
    )
}