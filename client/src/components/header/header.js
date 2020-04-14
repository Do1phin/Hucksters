import React, {Fragment} from "react";
import {Link, NavLink} from "react-router-dom";

import './header.css';

const Header = () => {
    return (
        <Fragment>

            <Link to='/' className="">
                {/*<img src="../../../public/logo-nav.png"/>*/}
                HUCKSTERS
            </Link>
            <NavLink to='/sellers' className="">Продавцы</NavLink>
            <NavLink to='/sellers/albums' className="">Альбомы</NavLink>
            <NavLink to='/sellers/albums/photos' className="">Фотографии</NavLink>
            <NavLink to='/vk' className="">VK админка</NavLink>
            <NavLink to='/signin' className="">SignIN</NavLink>
        </Fragment>
    );
};

export default Header;
