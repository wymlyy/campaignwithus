import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  const user = true;

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Campaign <img className='img-logo' src="images/logo.png" alt="" width="70" height="50" /> with Us

          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/campaigns'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Campaigns
              </Link>
            </li>
            <li className='nav-item'>
              {(user && <Link
                to='/post'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Post
              </Link>) || (<Link
                to='/login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                  Post
                </Link>)}
            </li>

            {user && (<li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My Account
              </Link>
            </li>)}

            {user &&
              (<li>
                <Link
                  to='/login'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Login/Signup
                </Link>
              </li>)
            }
          </ul>
          {user && (button && (<Button buttonStyle='btn--signup'>Login/Signup</Button>))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
