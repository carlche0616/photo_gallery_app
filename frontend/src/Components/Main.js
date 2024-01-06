import React, { Component } from "react";
import { ImageList, ImageListItem, ImageListItemBar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown, Close } from '@mui/icons-material';
import AddPhoto from "./AddPhoto";
import Search from "./Search";
import EditPhoto from "./EditPhoto";

const options = [
    'Favorites',
    'All Photos'
];

const baseUrl = 'http://localhost:8084/api/v1/gallery'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElMenu: null,
            openMenu: false,
            curBtnTextMenu: options[1],

            listOfImageObjs: [],
            isEditPhoto: false,
            imageInEdit: {},
            imageInEditIdx: -1,

            hoveredImage: null
        };
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.editImage = this.editImage.bind(this);
        this.closeEditImage = this.closeEditImage.bind(this);
        this.saveEditImage = this.saveEditImage.bind(this);
        this.getImageObjs = this.getImageObjs.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
    }
    handleClickMenu(event) {
        this.setState({ anchorElMenu: event.currentTarget, openMenu: Boolean(event.currentTarget) });
    }
    handleCloseMenu(option) {
        if (option === 'All Photos') {
            this.getImages(baseUrl.concat('/getAllPhotos'))
        } else if (option === 'Favorites') {
            this.getImages(baseUrl.concat('/getFavoritePhotos'))
        }
        if (option !== "backdropClick" && option !== 'escapeKeyDown') {
            this.setState({ curBtnTextMenu: option })
        }
        this.setState({ anchorElMenu: null, openMenu: false });
    }

    displaySearchResults(searchText) {
        this.getImages(baseUrl.concat('/getPhotosByTag/', searchText))
    }

    getImages(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // or response.text() if the response is not JSON
            })
            .then(data => {
                this.getImageObjs(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getImageObjs(data) {
        var imageObjs = Array.from(data).map((row) => ({
            "id": row.photoID,
            "image": "images/".concat(row.photoName),
            "name": row.photoName,
            "tags": [],
            "favorite": row.isFavorite
        }));
        this.setState({ listOfImageObjs: imageObjs })
    }

    editImage(file, imageObjIdx) {
        this.setState({ isEditPhoto: true, imageInEdit: file, imageInEditIdx: imageObjIdx })
    }

    closeEditImage() {
        this.setState({ isEditPhoto: false })
    }

    saveEditImage(imageObj) {
        var updatedListOfImageObjs = this.state.listOfImageObjs

        var prevImageObj = updatedListOfImageObjs[this.state.imageInEditIdx]
        var tagsAdded = imageObj.tags
            .filter(value => !prevImageObj.tags.include(value))
            .map((tag) => ({ "photoID": imageObj.id, "tag": tag }))
        var tagsDeleted = prevImageObj.tags
            .filter(value => !imageObj.tags.include(value))
            .map((tag) => ({ "photoID": imageObj.id, "tag": tag }))

        updatedListOfImageObjs[this.state.imageInEditIdx] = imageObj

        this.setState({ listOfImageObjs: updatedListOfImageObjs })
        this.updateImage(imageObj, tagsAdded, tagsDeleted)
        this.closeEditImage()
    }

    updateImage(imageObj, tagsAdded, tagsDeleted) {
        console.log(imageObj.id)
        this.sendData(baseUrl.concat('/updatePhoto'), "PUT", { photoID: imageObj.id, "photoName": imageObj.name, "isFavorite": imageObj.favorite })
        
        this.sendData(baseUrl.concat('/addPhotoTags'), "POST", tagsAdded)
        this.sendData(baseUrl.concat('/deletePhotoTags'), "DELETE", tagsDeleted)
    }

    async sendData(url, requestType, requestBody) {
        var returnedData;
        await fetch(url, {
            method: requestType,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
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

    getImageName(fullName) {
        return fullName.split(".")[0];
    }

    deleteImage(imageIdx) {
        var updatedImages = this.state.listOfImageObjs;
        updatedImages.splice(imageIdx, 1);
        this.setState({ listOfImageObjs: updatedImages });
    }

    componentWillMount() {
        this.handleCloseMenu(this.state.curBtnTextMenu);
    }

    render() {

        return (

            <section>
                <Search searchBtnClick={this.displaySearchResults} />
                <div id="main">
                    <div id="main-header">
                        <Button
                            style={{ fontWeight: 400, textAlign: "left" }}
                            variant="text"
                            size="medium"
                            id="photo-select-btn"
                            aria-controls={this.state.openMenu ? 'photo-select-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={this.state.openMenu ? 'true' : undefined}
                            onClick={this.handleClickMenu}
                            endIcon={<ArrowDropDown />}>
                            {this.state.curBtnTextMenu}
                        </Button>

                        <AddPhoto />

                    </div>

                    <Menu
                        id="photo-select-menu"
                        anchorEl={this.state.anchorElMenu}
                        open={this.state.openMenu}
                        onClose={this.handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': 'photo-select-btn',
                        }}
                    >
                        {options.filter((option) => { return option !== this.state.curBtnTextMenu; }).map((option, index) => (
                            <MenuItem
                                key={option}
                                selected={index === this.state.anchorElMenu}
                                onClick={(event) => this.handleCloseMenu(option)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                    {this.state.listOfImageObjs.length == 0 ?
                        <div>No Photos</div> :
                        <ImageList onload={this.handleCloseMenu} style={{ marginBlockStart: 0 }} variant="masonry" cols={3} gap={8}>
                            {this.state.listOfImageObjs.map((imageObj, index) => (
                                <ImageListItem
                                    onMouseEnter={() => this.setState({ hoveredImage: index })}
                                    onMouseLeave={() => this.setState({ hoveredImage: null })}
                                    style={{ position: 'relative' }}>
                                    <img
                                        key={index}
                                        src={imageObj.image}
                                        alt="info"
                                        onClick={() => this.editImage(imageObj, index)}
                                    />
                                    {this.state.hoveredImage == index && (
                                        <IconButton
                                            style={{
                                                position: 'absolute',
                                                top: 4,
                                                right: 4,
                                                width: '25px',
                                                height: '25px',
                                                backgroundColor: '#000',
                                                color: '#fff'
                                            }}
                                            onClick={() => this.deleteImage(index)}
                                            size="small"
                                        >
                                            <Close />
                                        </IconButton>
                                    )}
                                    <ImageListItemBar sx={{ maxHeight: 25, textAlign: 'left', color: '#000', fontSize: 5 }} title={this.getImageName(imageObj.name)} />
                                </ImageListItem>
                            ))}
                        </ImageList>}
                </div>

                {this.state.isEditPhoto && <EditPhoto data={this.state.imageInEdit} handleCloseEdit={this.closeEditImage} handleSaveEdit={this.saveEditImage}/>}
            </section>
        );
    }

}

export default Main;