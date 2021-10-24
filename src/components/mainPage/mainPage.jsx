import { Container, Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import { Favorite, Share } from '@mui/icons-material';
import { useState, useEffect } from "react";
import { TopBar } from "../topBar/topBar";

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
        .then(setLectures)
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
                        Object.keys(lectures).map(key => {
                            const { id, title, price, author } = lectures[key];
                            return (
                                <Grid item xs={6} sm={4} md={3}>
                                    <Card>
                                        <Box sx={{ p: 1 }}>
                                            <CardMedia
                                                component="img"
                                                image={ "https://nextstep-storage.s3.ap-northeast-2.amazonaws.com/af98e7e689b8411cb51aef899b8be1a2" }
                                                sx={{
                                                    height: 145
                                                }}
                                            />
                                        </Box>
                                        <CardContent
                                            sx={{
                                                pt: 1,
                                                pb: 0,
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
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    )
}