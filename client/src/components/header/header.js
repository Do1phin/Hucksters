import React from "react";
import {Link, NavLink} from "react-router-dom";

import './header.css';

const Header = () => {
    return (
        <div className='header'>

            <div className='header-logo'>
                <Link to='/' className="">
                    <img src="https://www.iconshock.com/image/Stroke/people/seller/" width='50px' height='50px' alt='HUCKSTER'/>
                </Link>
                <span>HUCKSTERS</span>
            </div>

            <div className='header-menu'>
                <NavLink to='/sellers' className="menu-item">Продавцы</NavLink>
                <NavLink to='/sellers/albums' className="menu-item">Альбомы</NavLink>
                <NavLink to='/sellers/albums/photos' className="menu-item">Фотографии</NavLink>
                <NavLink to='/vk' className="menu-item">VK админка</NavLink>
            </div>

            <div className='header-finder-str'>
                <input placeholder='Искать ...'/>
            </div>

            <div className='header-auth-block'>
                <NavLink to='/signin' className="menu-item">SignIN</NavLink>
            </div>
        </div>
    );
};

export default Header;
