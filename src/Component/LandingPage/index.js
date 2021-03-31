import React from 'react';
import bookavobackground2 from '../../../src/bookavobackground2.png';
import bookavologo from '../../../src/bookavologo.png'
import css from './landingPage.module.css';
import {withRouter, useHistory} from 'react-router-dom';
import CountryButton from './CountryButton';


function LandingPage(props) {
    console.log(props);
    const history = useHistory();
    const onClick = () => {
        history.push("/recs")
    }
return (
<div className={css.bg}>

{/* <button onClick={onClick} className={css.button}>BK</button> */}
<div className={css.content}>
<img src={bookavologo} className={css.logo}></img>
<div className={css.tagline}>
<p className = {css.tag}>EAT AROUND THE WORLD,</p>
<p className = {css.tag}>IN YOUR CITY</p>
</div>   
<p className={css.p}>Choose your cuisine:</p>
<div className={css.buttons}>
<CountryButton onClick={onClick} text='ITALY' />
<CountryButton onClick={onClick} text='YEMEN' />
<CountryButton onClick={onClick} text='TRINIDAD' />
<CountryButton onClick={onClick} text='ROMANIA' />
<CountryButton onClick={onClick} text='INDIA' />
{/* <button className={css.italy} onClick={onClick}>ITALY</button>
<button className={css.italy} onClick={onClick}>YEMEN</button>
<button className={css.italy} onClick={onClick}>TRINIDAD</button>
<button className={css.italy} onClick={onClick}>ROMANIA</button>
<button className={css.italy} onClick={onClick}>INDIA</button> */}
</div>
</div>
</div>
)
};

export default withRouter(LandingPage);