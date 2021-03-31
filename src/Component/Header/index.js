import React from 'react';
import css from './header.module.css';
import bookavologo from '../../../src/bookavologo.png'


function Header() {
    return (
        <div className={css.header}>
           <img src={bookavologo} className={css.logo} width='10%' alt="dark bg image with wok of shrimp noodles"></img>
        </div>
    )
}



export default Header;

