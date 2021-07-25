import { useState, useEffect } from 'react';
import Axios from 'axios';

const useForm2 = (callback) => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [loginStatus, setLoginStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const handleChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

  };

  Axios.defaults.withCredentials = true;

  const handleSubmit = e => {
    e.preventDefault();

    // Axios.post('http://localhost:5000/login', {
    //   loginName: values.username, loginPassword: values.password
    // }).then((response) => {
    //   if (response.data.message) {
    //     setLoginStatus(response.data.message);

    //   } else {
    //     setLoginStatus(response.data[0].user_name);
    //     setIsSubmitting(true);

    //     window.location.href = '/';
    //   }


    // });

  };

  useEffect(
    () => {
      if (isSubmitting) {
        callback();
       
      }
      // Axios.get('http://localhost:5000/login').then((response) => {
      //   if (response.data.loggedIn == true) {
      //     setLoginStatus(response.data.user[0].user_name);
      //     setUserLoggedIn(true);
      //   }

      // })
    }, []
  );


  return { handleChange, handleSubmit, values, loginStatus, userLoggedIn };
};

export default useForm2;
