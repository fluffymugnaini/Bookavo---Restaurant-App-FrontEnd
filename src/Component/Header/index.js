import React from 'react';
import css from './header.module.css';


function Header() {
    return (
        <div className={css.header}>
            <h1 className={css.title}>BOOKAVO <span className={css.tag}>Experience your city through food.</span></h1>
       
        </div>
    )
}



export default Header;

