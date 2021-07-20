import React from 'react';
import '../App.css';
import { Button2 } from './Button2';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  const user = false;
  return (
    <div className='hero-container'>
      <div className='homepage-img'>
        <img className='homepage-insertImg' src='/images/group.png' alt="" />
      </div>
      <div className='homepage-txt-btn'>
        <h1>Your campaign journey starts here.</h1>
        <p>Campaign With US provides a free platform to create and
          share your campaign through online medium.
          Get started by logging in or clicking below.</p>
        <div className='hero-btns'>
          {(user && <Button2
            className='btns'
            buttonStyle='btn--signup'
            buttonSize='btn--large'
          ><Link to='/post' style={{ textDecoration: 'none' }}><img className='hero-btns-img' src='images/create.png' alt=' ' height='27' />&nbsp;&nbsp;<span className='hero-btn-text'>Create a Campaign</span></Link>
          </Button2>) || (<Button2
            className='btns'
            buttonStyle='btn--signup'
            buttonSize='btn--large'
          ><Link to='/login' style={{ textDecoration: 'none' }}><img className='hero-btns-img' src='images/create.png' alt=' ' height='27' />&nbsp;&nbsp;<span className='hero-btn-text'>Create a Campaign</span></Link>

          </Button2>)}

        </div>
      </div>
    </div>
  );
}

export default HeroSection;
