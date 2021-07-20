import React from 'react';
import validate from './validateInfo';
import useForm2 from './useForm2';
import { Link } from 'react-router-dom';
import './Form.css';

const FormLogin = () => {
    const { handleChange, handleSubmit, values, loginStatus } = useForm2();

    return (
        <div className='form-content-right'>
            <form onSubmit={handleSubmit} className='form' noValidate>
                <h1>
                    Welcome Back !
                </h1>

                <div className='form-inputs'>
                    <label className='form-label'>Username</label>
                    <input
                        className='form-input'
                        type='username'
                        name='username'
                        placeholder='Enter your username'
                        value={values.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-inputs'>
                    <label className='form-label'>Password</label>
                    <input
                        className='form-input'
                        type='password'
                        name='password'
                        placeholder='Enter your password'
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>

                <button className='form-input-btn' type='submit'>
                    Login
                </button>
                <p>{loginStatus}</p>
                <span className='form-input-login'>
                    Don't have an account? Signup <Link to='/sign-up'>here</Link>
                </span>
            </form>
        </div>
    );
};

export default FormLogin;
