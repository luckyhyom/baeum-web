import { Button, AppBar, Box, Toolbar, Typography, Modal, Popper, Fade, Card, CardMedia, CardContent, CardActions, Avatar, Input } from "@mui/material"
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 

    const [openPopper, setOpenPopper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      setOpenPopper((previousOpen) => !previousOpen);
    };
  
    const canBeOpen = openPopper && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;


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
                            <Button aria-describedby={id} onClick={handleClick} color="inherit" variant="outlined" >
                                My Info
                            </Button>
                            <Popper id={id} open={openPopper} anchorEl={anchorEl} transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Box sx={{ border: 0, p: 2, bgcolor: "background.paper" }}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={ user.profileImageURL }
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                                <input type="file"
                                                    style={{
                                                        position: "absolute",
                                                        top: "0px",
                                                        width: "100%",
                                                        height: "100%",
                                                        opacity: "0",
                                                        cursor: "pointer"
                                                    }}
                                                    accept="image/*"
                                                    onChange={ (event) => changeProfileImage(event) }
                                                />
                                            </Box>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {user.name}
                                            </Typography>
                                            <ProfileUpdateForm 
                                                updateProfile={ updateProfile }
                                                about={ user.about }/>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Fade>
                            )}
                        </Popper>
                        </Box>
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