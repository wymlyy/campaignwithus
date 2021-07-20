import { useState, useEffect } from 'react';
import Axios from 'axios';

const useForm2 = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [loginStatus, setLoginStatus] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

  };

  const handleSubmit = e => {
    e.preventDefault();

    Axios.post('http://localhost:5000/login', {
      loginName: values.username, loginPassword: values.password
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0]);
      }
    });

  };


  return { handleChange, handleSubmit, values, loginStatus };
};

export default useForm2;
