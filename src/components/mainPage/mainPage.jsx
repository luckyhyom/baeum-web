import { Container, Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import { Favorite, Share, DeleteForever, Create } from '@mui/icons-material';
import { useState, useEffect } from "react";
import { TopBar } from "../topBar/topBar";
import BasicSpeedDial from "../sqeed-dial/speedDial";

export const MainPage = ({ authService, fileUploader, lectureService }) => {
    const [user, setUser] = useState(undefined);
    const [lectures, setLectures] = useState({});
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        authService.me()
        .then(setUser)
        .then(setErrorMessage(undefined))
        .catch(console.error)
    }, [ authService ])

    useEffect(() => {
        lectureService.getAll()
        .then(lectures => {
            const update = {};
            lectures.forEach(lecture => {
                update[lecture.id] = lecture;
            })
            setLectures(update)
        })
        .catch(console.error);
    }, [ lectureService ])

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

    const addLectureBoard = (lecture) => {
        const update = { ...lectures };
        update[lecture.id] = lecture;
        setLectures(update)
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

            <Container sx={{ py: 10 }} maxWidth="md">
                <Grid container spacing={2}>
                    {
                        Object.keys(lectures).reverse().map(key => {
                            const { id, title, price, author, userId, thumbnail } = lectures[key];
                            return (
                                <Grid key={ id } item xs={6} sm={4} md={3}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ p: 1 }}>
                                            <CardMedia
                                                component="img"
                                                image={ thumbnail }
                                                sx={{
                                                    height: 145
                                                }}
                                            />
                                        </Box>
                                        <CardContent
                                            sx={{
                                                pt: 1,
                                                pb: 0,
                                                flexGrow: 1,
                                            }}
                                        >
                                            <Typography variant="h6">
                                                { title }
                                            </Typography>
                                            <Typography>
                                                { author }
                                            </Typography>
                                            <Typography>
                                                { price }
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites">
                                                <Favorite />
                                            </IconButton>
                                            <IconButton aria-label="share">
                                                <Share />
                                            </IconButton>
                                            {
                                                user && user.id === userId && 
                                                <>
                                                    <IconButton sx={{marginLeft:'auto'}}>
                                                        <Create />
                                                    </IconButton>
                                                    <IconButton>
                                                        <DeleteForever />
                                                    </IconButton>
                                                </>
                                            }
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

            <BasicSpeedDial
                lectureService={ lectureService }
                fileUploader={ fileUploader }
                addBoard={ addLectureBoard }
            />
        </>
    )
}