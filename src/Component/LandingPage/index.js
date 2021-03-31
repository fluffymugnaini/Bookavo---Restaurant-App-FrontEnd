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
<img src={bookavobackground2} className={css.bgImage} alt="dark bg image with wok of shrimp noodles"></img>
{/* <button onClick={onClick} className={css.button}>BK</button> */}
<div className={css.paragraph}>
<img src={bookavologo} className={css.logo}></img>   
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