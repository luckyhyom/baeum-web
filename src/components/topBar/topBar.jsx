import { Button, AppBar, Box, Toolbar, Typography, Modal } from "@mui/material"
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import { useState } from "react";
import { useHistory } from "react-router";
import { Login } from "../login/login";
import { ProfileUpdateForm } from "../profileUpdateForm/profileUpdateForm";

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
                <Toolbar>
                    <SnowshoeingIcon/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Baeum
                    </Typography>

                    { user && <>
                        <Box sx={{ p:1 }}>
                            <Button color="inherit" onClick={ onLogout } variant="outlined">Logout</Button>
                        </Box>
                        <Box sx={{ p:1 }}>
                        <Button color="inherit"  onClick={ () => setMyInfoModal(boolean=> !boolean) } variant="outlined" >My Info</Button>
                        </Box>
                        <div style={{ display: myInfoModal ? 'block':'none' }} >
                            <img src={ user.profileImageURL } style={{ width: '300px', height: '300px', objectFit: 'cover' }}/>
                            <input type="file" onChange={ (event) => changeProfileImage(event) }/>
                            <ProfileUpdateForm 
                                updateProfile={ updateProfile }
                                about={ user.about }/>
                        </div>
                    </> }

                    { !user && <>
                        <Box sx={{ p:1 }}>
                            <Button color="inherit" onClick={ () => history.push('/signup') } variant="outlined" >Sign Up</Button>
                        </Box>
                        <Box sx={{ p:1 }}>
                            <Button color="inherit" onClick={ handleOpen } variant="outlined" >Sign In</Button>
                        </Box>
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
                    </> }
                </Toolbar>
            </AppBar>
        </Box>
    )
}