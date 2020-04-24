import React from "react";
import {Link, NavLink} from "react-router-dom";

import './header.style.css';


const Header = () => {

    return (
        <div className='header'>

            <Link to='/' className="">
                <div className='header-logo'>
                    <img src="" alt='HUCKSTER'/>
                    <span>HUCKSTERS</span>
                </div>
            </Link>

            <div className='header-menu'>
                <NavLink to='/sellers/' className="menu-item">Продавцы</NavLink>
                <NavLink to='/sellers/albums/' className="menu-item">Альбомы</NavLink>
                <NavLink to='/sellers/albums/photos/' className="menu-item">Фотографии</NavLink>
                <NavLink to='/vk' className="menu-item">VK админка</NavLink>
                <NavLink to='/vk2' className="menu-item">VK 2</NavLink>
            </div>

            <div className='header-finder-str'>
            </div>

            <div className='header-auth-block'>
                <NavLink to='/signin' className="menu-item">SignIN</NavLink>
            </div>

        </div>
    );
};

export default Header;
