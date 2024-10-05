//Displays the header os the app

import React from "react";

const Header = () => {
    return (
        <header>
            <i className="fa-solid fa-cloud"></i>
            <h1>
                Today's <span className="h1-span">Weather</span>
            </h1>
        </header>
    );
};

export default Header