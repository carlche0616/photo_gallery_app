import React, { Component } from "react";
import { ImageList, ImageListItem, ImageListItemBar, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import AddPhoto from "./AddPhoto";
import EditPhoto from "./EditPhoto";
var listOfImages = [];
const options = [
    'Favorites',
    'All Photos'
];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElMenu: null,
            openMenu: false,
            curBtnTextMenu: options[0]
        };
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    }
    handleClickMenu(event) {
        this.setState({ anchorElMenu: event.currentTarget, openMenu: Boolean(event.currentTarget) });
    }
    handleCloseMenu(event, option) {
        this.setState({curBtnTextMenu: option});
        this.setState({ anchorElMenu: null, openMenu: false });
    }

    importAll(r) {
        return r.keys().map(r);
    }
    componentWillMount() {
        listOfImages = this.importAll(require.context('../../public/images/', false, /\.(png|jpe?g|svg)$/));
    }

    getImageName(source) {
        var temp = source.split("/");
        return temp[temp.length-1].split(".")[0];
    }

    render() {

        return (
            <section id="main">
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

                    <AddPhoto/>

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
                    {options.filter((option, index) => { return option !== this.state.curBtnTextMenu; }).map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === this.state.anchorElMenu}
                            onClick={(event) => this.handleCloseMenu(event, option)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <ImageList style={{ marginBlockStart: 0 }} variant="masonry" cols={3} gap={8}>
                    {listOfImages.map((image, index) => (
                        <ImageListItem >
                            {/* <img
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                            /> */}
                            <img key={index} src={image} alt="info"></img>

                            <ImageListItemBar  sx={{maxHeight: 25, textAlign: 'left', color: '#000', fontSize: 5}} title={this.getImageName(image)} />
                        </ImageListItem>
                    ))}
                </ImageList>
                <EditPhoto/>
            </section>
        );
    }

}

export default Main;