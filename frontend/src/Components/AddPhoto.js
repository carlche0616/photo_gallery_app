import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Tooltip, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { AddPhotoAlternate, Close, AddCircle } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


var listOfImages = [];

class AddPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,

            preUploadDisplay: 'flex',
            postUploadDisplay: 'none'
        };
        this.closeAddPhoto = this.closeAddPhoto.bind(this);
        this.handleClickAddPhoto = this.handleClickAddPhoto.bind(this);
    }
    closeAddPhoto() {
        this.setState({ isOpenDialog: false });
    }

    handleClickAddPhoto() {
        this.setState({ isOpenDialog: true });
    };

    onChangeImages(e) {
        console.log("logggg");
    }

    importAll(r) {
        return r.keys().map(r);
    }
    componentWillMount() {
        listOfImages = this.importAll(require.context('../../public/images/', false, /\.(png|jpe?g|svg)$/));
    }

    render() {
        return (
            <div>

                <Tooltip title="Add Photo">
                    <IconButton size="large" aria-label="delete" onClick={this.handleClickAddPhoto}>
                        <AddCircle fontSize="inherit" />
                    </IconButton>
                </Tooltip>

                <Dialog fullWidth open={this.state.isOpenDialog}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <DialogTitle sx={{ color: "#000" }}>Add Photos</DialogTitle>
                        <IconButton sx={{ marginRight: 2, my: 2 }} size="medium" onClick={this.closeAddPhoto}>
                            <Close />
                        </IconButton>
                    </Box>

                    <DialogContent>
                        <Box sx={{
                            height: 300,
                            border: 1,
                            borderRadius: '16px',
                            m: 1,
                            boxShadow: 1,
                            justifyContent: 'center',
                            display: this.state.preUploadDisplay
                        }}>
                            <IconButton component="label" sx={{ my: 15 }} size="large">
                                <AddPhotoAlternate sx={{ width: 35, height: 35 }} />

                                <VisuallyHiddenInput onChange={this.onChangeImages} accept="image/*" multiple type="file" />
                            </IconButton>


                        </Box>

                        <ImageList sx={{display:this.state.postUploadDisplay }} style={{ marginBlockStart: 0 }} variant="masonry" cols={3} gap={8}>
                                {listOfImages.map((image, index) => (
                                    <ImageListItem >
                                        <img key={index} src={image} alt="info"></img>

                                        <ImageListItemBar position="below" title={index} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                    </DialogContent>


                </Dialog >
            </div>
        );
    }
}

export default AddPhoto;