import { Box, Modal, Button, TextField, Grid, IconButton, Typography } from '@mui/material';
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

export default function BoardAddModal({ lectureService, addBoard }) {
    const [body, setBody] = useState({
        title: '',
        description: '',
        thumbnail: '',
        price: 0,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        lectureService.create(body)
        .then(lecture => {
            addBoard(lecture);
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
