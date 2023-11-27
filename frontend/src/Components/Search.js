import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

class Search extends Component {
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
                        label="Search By Photo Name or Tag"
                        style = {{width: 500}}
                        InputLabelProps={{
                            style: { backgroundColor: "#F1F1F1", color: "#232824"},
                          }}
                    />  
                    
                    <Button variant="contained" id="search_btn">Search</Button>
                </div>


            </section >
        );
    }

}

export default Search;