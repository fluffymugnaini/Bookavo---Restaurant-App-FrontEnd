import React from 'react';
import css from './header.module.css';
import bookavologo from '../../../src/bookavologo.png'


function Header() {
    return (
        <div className={css.header}>
           <img src={bookavologo} className={css.logo}  alt="bookavo logo"></img>
        </div>
    )
}



export default Header;

