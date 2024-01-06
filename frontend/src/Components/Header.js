import React, { Component } from "react";
// import ParticlesBg from "particles-bg";
// import Fade from "react-reveal";

class Header extends Component {
    render() {

        return (

            <header id="home">
                
                <nav id="nav-wrap">
                    {/* <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                        Show navigation
                    </a>
                    <a className="mobile-btn" href="#home" title="Hide navigation">
                        Hide navigation
                    </a> */}
                    <img
                        className="profile-pic"
                        src={"images/logo/logo3.png"}
                        />
                    <ul id="nav" className="nav">

                    </ul>
                </nav>
            </header>
        );
    }

}

export default Header;