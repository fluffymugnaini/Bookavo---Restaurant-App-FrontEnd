import React from 'react';
import ShrimpBookavo from '../../../src/ShrimpBookavo.png';
import css from './landingPage.module.css';
import {withRouter, useHistory} from 'react-router-dom';


function LandingPage(props) {
    console.log(props);
    const history = useHistory();
    const onClick = () => {
        history.push("/recs")
    }
return (
<div className={css.bg}>
<img src={ShrimpBookavo} className={css.bgImage} alt="dark bg image with wok of shrimp noodles"></img>
<button onClick={onClick} className={css.button}>BK</button>
</div>
)
};

export default withRouter(LandingPage);