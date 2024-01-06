import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Tooltip, ImageList, ImageListItem, ImageListItemBar, Button } from '@mui/material';
import { AddPhotoAlternate, Close, HighlightOffTwoTone, AddCircle, FavoriteBorder, Favorite } from '@mui/icons-material';
import EditPhoto from "./EditPhoto";

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



class AddPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,

            preUploadDisplay: 'flex',
            postUploadDisplayList: 'none',
            postUploadDisplayBtn: 'none',
            listOfImageObjs: [],

            isEditPhoto: false,
            imageInEdit: {},
            imageInEditIdx: -1,

            hoveredImage: null
        };
        this.closeAddPhoto = this.closeAddPhoto.bind(this);
        this.handleClickAddPhoto = this.handleClickAddPhoto.bind(this);
        this.onChangeImages = this.onChangeImages.bind(this);
        this.getImageName = this.getImageName.bind(this);
        this.editImage = this.editImage.bind(this);
        this.closeEditImage = this.closeEditImage.bind(this);
        this.saveEditImage = this.saveEditImage.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }
    closeAddPhoto() {
        this.setState({ listOfImageObjs: [], isOpenDialog: false, postUploadDisplayList: 'none', postUploadDisplayBtn: 'none' });
    }

    handleClickAddPhoto() {
        this.setState({ isOpenDialog: true, preUploadDisplay: 'flex' });
    };

    onChangeImages(e) {
        this.setState({ postUploadDisplayList: 'flex', postUploadDisplayBtn: 'inline-block', preUploadDisplay: 'none' });

        var fileList = e.target.files;
        var fileArray = Array.from(fileList).map((file) => ({
            "id": null,
            "image": file,
            "name": file.name,
            "tags": [],
            "favorite": false
        }));
        this.setState({ listOfImageObjs: fileArray })
    }

    getImageName(fullName) {
        return fullName.split(".")[0]
    }

    editImage(imageObj, imageObjIdx) {
        this.setState({ isEditPhoto: true, imageInEdit: imageObj, imageInEditIdx: imageObjIdx })
    }

    closeEditImage() {
        this.setState({ isEditPhoto: false })
    }

    saveEditImage(imageObj) {
        var updatedListOfImageObjs = this.state.listOfImageObjs
        updatedListOfImageObjs[this.state.imageInEditIdx] = imageObj
        this.setState({ listOfImageObjs: updatedListOfImageObjs })
        this.closeEditImage()
    }

    async uploadImages() {
        var tagsToAdd = [];

        for (let i = 0; i < this.state.listOfImageObjs.length; i++) {
            var imageObj = this.state.listOfImageObjs[i]

            var id = await this.sendData('http://localhost:8084/api/v1/gallery/addPhoto', { "photoName": imageObj.name, "isFavorite": imageObj.favorite })
            var fileData = new FormData();
            fileData.append('file', imageObj.image)
            this.sendData('http://localhost:8084/api/v1/gallery/uploadPhoto', fileData)

            imageObj.tags.map((tag) => {
                tagsToAdd.push({ "photoID": id, "tag": tag })
            })
            this.sendData('http://localhost:8084/api/v1/gallery/addPhotoTags', tagsToAdd)

        };

    }

    async sendData(url, requestBody) {
        var returnedData;
        await fetch(url, {
            method: 'POST',
            headers: requestBody instanceof FormData ? {} : {
                'Content-Type': 'application/json',
            },
            body: requestBody instanceof FormData ? requestBody : JSON.stringify(requestBody),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // or response.text() if the response is not JSON
            }).then(data => {
                returnedData = data;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        return returnedData
    }

    deleteImage(imageIdx) {
        var updatedImages = this.state.listOfImageObjs;
        updatedImages.splice(imageIdx, 1);
        this.setState({ listOfImageObjs: updatedImages });
    }

    render() {
        return (
            <div className="dialog">

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
                        <Box sx={{
                            borderRadius: '16px',
                            m: 1,
                            display: this.state.postUploadDisplayList
                        }}>
                            <ImageList style={{ marginBlockStart: 0 }} cols={3} gap={8}>
                                {this.state.listOfImageObjs.map((imageObj, index) => (
                                    <ImageListItem
                                        onMouseEnter={() => this.setState({ hoveredImage: index })}
                                        onMouseLeave={() => this.setState({ hoveredImage: null })}
                                        sx={{ width: '120px', height: '120px' }}>
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(imageObj.image)}
                                            alt="info"
                                            onClick={() => this.editImage(imageObj, index)}
                                        />
                                        {this.state.hoveredImage == index && (
                                            <IconButton
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    width: '25px', 
                                                    height: '25px',
                                                    backgroundColor: '#000',
                                                    color: '#FFF'
                                                }}
                                                onClick={() => this.deleteImage(index)}
                                                size="small"
                                            >
                                                <Close style={{width: '20px', height: '20px'}}/>
                                            </IconButton>
                                        )}
                                        <ImageListItemBar sx={{ maxHeight: 20, textAlign: 'left', color: '#000', backgroundColor: '#111', fontSize: 5 }} title={this.getImageName(imageObj.name)} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                        <section style={{ textAlign: 'right' }}>
                            <Button
                                sx={{ '&.MuiButton-root:hover': { bgcolor: '#334854' }, backgroundColor: "#334854", display: this.state.postUploadDisplayBtn }}
                                variant="contained"
                                onClick={this.uploadImages}
                            >
                                Upload
                            </Button>
                        </section>
                        {this.state.isEditPhoto && <EditPhoto data={this.state.imageInEdit} handleCloseEdit={this.closeEditImage} handleSaveEdit={this.saveEditImage} />}
                    </DialogContent>


                </Dialog >
            </div>
        );
    }
}

export default AddPhoto;