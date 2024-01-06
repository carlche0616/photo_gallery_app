import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: ""
        };
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleSearchInput(event) {
        this.setState({searchInput : event.target.value})
    }

    handleSearchClick() {
        if (this.state.searchInput != "") {
            this.props.searchBtnClick(this.state.searchInput)
        }
    }

    render() {

        return (
            <section style={{
                backgroundImage: `url("images/background/search_bg1.jpg")`,
            }}
                id="search" >
                <div id="search_bar">
                    <TextField
                        id="search_text"
                        variant="filled"
                        label="Search By Photo Tag"
                        style = {{width: 500}}
                        InputLabelProps={{
                            style: { backgroundColor: "#F1F1F1", color: "#232824"},
                          }}
                        onChange={this.handleSearchInput}
                    />  
                    
                    <Button variant="contained" id="search_btn" onClick={this.handleSearchClick}>Search</Button>
                </div>


            </section >
        );
    }

}

export default Search;