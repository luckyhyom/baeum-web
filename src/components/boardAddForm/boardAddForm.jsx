import { Box, Modal, Button, TextField, Grid, IconButton, Typography, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';

const style = {
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

export default function BoardAddModal({ lectureService, fileUploader, addBoard }) {
    const formValue = {
        title: '',
        description: '',
        thumbnail: '',
        price: 0,
    }
    const [body, setBody] = useState(formValue);
    const [open, setOpen] = useState(false);
    const [isFile, setIsFile] = useState(false);
    const [loading, setLoding] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        lectureService.create(body)
            .then(lecture => {
                addBoard(lecture);
                setIsFile(false);
                setBody(formValue);
                handleClose();
            })
            .catch(alert);
    };
    
    const onChange = (event) => {
        switch (event.target.name) {
            case 'price':
                setBody(body => ({
                    ...body,
                    price: parseInt(event.target.value)
                }))
                return;
            default:
                setBody(body => ({
                    ...body,
                    [event.target.name]: event.target.value
                }))
                return;
        }
    }

    const uploadFile = (event) => {
        const file = event.target.files[0];
        setLoding(true)
        fileUploader.uploadThumbnail(file)
            .then(res => {
                setLoding(false);
                setIsFile(true);
                setBody(body => ({
                    ...body,
                    thumbnail: res.location
                }))
            })
            .catch(error => {
                console.error(error);
                alert('이미지 업로드 에러 수정중입니다. 기본 이미지가 설정됩니다.')
                setIsFile(true);
                setBody(body => ({
                    ...body,
                    thumbnail: "https://nextstep-storage.s3.ap-northeast-2.amazonaws.com/af98e7e689b8411cb51aef899b8be1a2"
                }))
            });
    }

    return (
        <div>
            <IconButton aria-label="share" onClick={handleOpen}>
                <CreateIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h5">
                            Create Lecture
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={ onChange }
                                        required
                                        fullWidth
                                        name="title"
                                        label="title"
                                        id="title"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={ onChange }
                                        required
                                        fullWidth
                                        name="description"
                                        label="description"
                                        id="description"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={ onChange }
                                        required
                                        fullWidth
                                        type="number"
                                        name="price"
                                        label="price"
                                        id="price"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <IconButton sx={{position: 'relative'}} load>
                                        {
                                            !loading && <ImageIcon sx={{ color: isFile ? "green" : "grey" }}/>
                                        }
                                        {
                                            loading && <CircularProgress size="20px" />
                                        }
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
                                            onChange={ (event) => uploadFile(event) }
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                            Create Board
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
