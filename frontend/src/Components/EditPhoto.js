import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Grid, TextField, Button, Chip, Autocomplete, ImageListItemBar, Icon } from '@mui/material';
import { Close, FavoriteBorder, Favorite, KeyboardReturn} from '@mui/icons-material';

class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: true,

            id: this.props.data.id,
            image: this.props.data.image instanceof File ? URL.createObjectURL(this.props.data.image) : this.props.data.image,
            tags: this.props.data.tags,
            name: this.props.data.name,
            favorite: this.props.data.favorite,

            isHoverImage: false,
            tagInput: "",
            nameInputIsError: false,
            nameInputErrorMsg: "",
            tagInputIsError: false,
            tagInputErrorMsg: ""

        };
        this.closeEditPhoto = this.closeEditPhoto.bind(this);
        this.handleDeleteTag = this.handleDeleteTag.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
    }
    closeEditPhoto() {
        this.props.handleCloseEdit();
    }

    handleDeleteTag(tagIdx) {
        var updatedTags = this.state.tags;
        updatedTags.splice(tagIdx, 1);
        this.setState({ tags: updatedTags});
    };

    handleAddTag(event) {
        if (event.key === 'Enter' && event.target.value !== "") {
            var updatedTags = this.state.tags;
            if (!updatedTags.includes(event.target.value)) {
                updatedTags.push(event.target.value);
                this.setState({ tags: updatedTags, tagInputIsError: false, tagInputErrorMsg: ""});
            } else {
                this.setState({ tagInputIsError: true, tagInputErrorMsg: "Tag already exists"});
            }
            event.preventDefault();
        }
        if (event.key === 'Backspace') {
            event.stopPropagation();
        }
    }

    handleEditName(event) {
        this.setState({ name: event.target.value })
    }

    saveEdit() {
        this.props.handleSaveEdit({
            'id': this.props.data.id,
            'image': this.props.data.image,
            'tags': this.state.tags,
            'name': this.state.name,
            'favorite': this.state.favorite
        })
    }
    
    getImageName(fullName) {
        return fullName.split(".")[0]
    }

    render() {
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
                            position: 'relative',
                            height: 300,
                            // border: 1,
                            borderRadius: '16px',
                            backgroundColor: '#F0F0F0',
                            backgroundImage: `url('${this.state.image}')`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}

                            onMouseEnter={() => this.setState({ isHoverImage: true })}
                            onMouseLeave={() => this.setState({ isHoverImage: false })}
                        >

                            {this.state.isHoverImage && <ImageListItemBar
                                position='top'
                                sx={{
                                    maxHeight: 25,
                                    textAlign: 'right',
                                    color: '#000'
                                }}
                                actionIcon={
                                    <IconButton onClick={() => this.setState({ favorite: !this.state.favorite })}>
                                        {this.state.favorite ? <Favorite sx={{ color: '#FFF' }} /> : <FavoriteBorder sx={{ color: '#FFF' }} />}
                                    </IconButton>
                                }
                            />}
                        </Grid>
                        <Grid item xs={0.3}> </Grid>
                        <Grid container direction='column' xs={3}>
                            <TextField
                                label="Photo Name"
                                size="small"
                                defaultValue={this.getImageName(this.state.name)}
                                variant="outlined"
                                sx={{ paddingBottom: 2.5 }}
                                onChange={this.handleEditName}
                            >
                            </TextField>
                            <Autocomplete
                                multiple
                                options={[]}
                                defaultValue="tags"
                                freeSolo
                                disableClearable
                                style={{ maxWidth: 150 }}
                                renderTags={() => (
                                    <Box
                                        style={{
                                            overflow: 'auto', height: '155px', width: "150px"
                                        }}>
                                        {Array.from(this.state.tags).map((option, index) => (
                                            <Chip
                                                label={option}
                                                size="small"
                                                onDelete={() => this.handleDeleteTag(index)}
                                            />
                                        ))}
                                    </Box>
                                )
                                }
                                renderInput={(params) => (

                                    <TextField
                                        {...params}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (<KeyboardReturn size="small" sx={{marginTop: "2px", color:"#333"}}/>),
                                        }}
                                        error={this.state.tagInputIsError}
                                        helperText={this.state.tagInputErrorMsg}
                                        onKeyDown={this.handleAddTag}
                                        size="small"
                                        label="Tags"
                                        placeholder="Add Tags"
                                    />
                                )}
                            />
                            <div style={{ textAlign: "right" }}>
                                <Button
                                    variant="contained"
                                    fullWidth size="medium"
                                    sx={{
                                        '&.MuiButton-root:hover': { bgcolor: '#334854' },
                                        marginTop: 1,
                                        backgroundColor: "#334854"
                                    }}
                                    onClick={this.saveEdit}>
                                    Save
                                </Button>
                            </div>

                        </Grid>
                    </Grid>
                </DialogContent>


            </Dialog >
        );
    }
}

export default EditPhoto;