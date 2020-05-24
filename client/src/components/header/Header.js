import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import './header.style.scss';

const Header = () => {

    return (
        <div className='header'>

            <Link to='/'>
                <div className='header-logo'>
                    <img src="/logo.png" className='header-logo__picture' alt='HUCKSTER'/>
                    <span className='header-logo__text'>HUCKSTERS</span>
                </div>
            </Link>

            <nav className='header-menu'>
                <NavLink to='/members/' className="header-menu__item">Продавцы</NavLink>
                <NavLink to='/members/albums/' className="header-menu__item">Альбомы</NavLink>
                <NavLink to='/members/albums/photos/' className="header-menu__item">Фотографии</NavLink>
                <NavLink to='/panel' className="header-menu__item">Управление</NavLink>
            </nav>

            <div className='header-auth'>
                <div className='header-auth__info'>
                    <div className='header-auth__info-avatar'>
                        <img src='https://vk.com/images/camera_200.png?ava=1' alt='user-avatar'/>
                    </div>
                    <div className='header-auth__info-profile'>
                        Иван<br/>Иванов
                    </div>
                </div>
                {/*<NavLink to='/signin' className="menu-item">SignIN</NavLink>*/}
            </div>

        </div>
    );
};

export default Header;
