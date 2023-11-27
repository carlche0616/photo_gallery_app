import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Grid, TextField, InputAdornment } from '@mui/material';
import { Close, Check, Edit, ThirtyFpsSelect } from '@mui/icons-material';

class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: true,

            isEditPhotoName: false,
            isEditPhotoNameTextBox: false,
            isEditPhotoTags: false,
            isEditPhotoTagsTextBox: false

        };
        this.closeEditPhoto = this.closeEditPhoto.bind(this);
        this.handleClickEditPhotoName = this.handleClickEditPhotoName.bind(this);
        this.handleClickEditPhotoTags = this.handleClickEditPhotoTags.bind(this);
    }
    closeEditPhoto() {
        this.setState({ isOpenDialog: false });
    }

    handleClickEditPhotoName() {
        this.setState({ isEditPhotoName: !this.state.isEditPhotoName, isEditPhotoNameTextBox: !this.state.isEditPhotoNameTextBox });
    };

    handleClickEditPhotoTags() {
        this.setState({ isEditPhotoTags: !this.state.isEditPhotoTags, isEditPhotoTagsTextBox: !this.state.isEditPhotoTagsTextBox });
    };


    render() {

        // const image = this.props.data.image;
        // const tags = this.props.data.tags;
        // const name = this.props.data.name;

        return (
            <Dialog fullWidth open={this.state.isOpenDialog}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <DialogTitle sx={{ color: "#000" }}>Edit Photo</DialogTitle>
                    <IconButton sx={{ marginRight: 2, my: 2 }} size="medium" onClick={this.closeEditPhoto}>
                        <Close />
                    </IconButton>
                </Box>

                <DialogContent>
                    <Grid container direction='row' columnSpacing={2}>
                        <Grid item xs={8.5} sx={{
                            height: 300,
                            // border: 1,
                            borderRadius: '16px',
                            backgroundColor: '#F0F0F0',
                            backgroundImage: `url("images/logo3.png")`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }} >
                        </Grid>
                        <Grid item xs={0.3}> </Grid>
                        <Grid container direction='column' xs={3}>
                            <TextField
                                label="Photo Name"
                                size="small"
                                defaultValue="Photo name"
                                variant="outlined"
                                sx={{ paddingBottom: 2.5 }}
                                disabled={!this.state.isEditPhotoNameTextBox}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" size="small" color="#F1F1F1" onClick={this.handleClickEditPhotoName}>
                                                {this.state.isEditPhotoName ? <Check /> : <Edit />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            >
                            </TextField>
                            <TextField
                                multiline
                                rows={9}
                                label="Tag"
                                defaultValue="Tag"
                                variant="outlined"
                                disabled={!this.state.isEditPhotoTagsTextBox}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment sx={{position: 'absolute', bottom: 28, right: 13}}>
                                            <IconButton edge="end" size="small" color="#F1F1F1" onClick={this.handleClickEditPhotoTags}>
                                                {this.state.isEditPhotoTags ? <Check /> : <Edit />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </Grid>
                    </Grid>
                </DialogContent>


            </Dialog >
        );
    }
}

export default EditPhoto;