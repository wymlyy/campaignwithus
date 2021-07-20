import React, { useState } from 'react';
import './Form.css';
import Home from '../pages/Home';
import FormLogin from './FormLogin';

const Form2 = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <>
            <div className='form-container'>

                <div className='form-content-left'>
                    <img className='form-img' src='images/img-2.svg' alt='spaceship' />
                </div>
                {!isSubmitted ? (
                    <FormLogin submitForm={submitForm} />
                ) : (
                    <Home />
                )}
            </div>
        </>
    );
};

export default Form2;
