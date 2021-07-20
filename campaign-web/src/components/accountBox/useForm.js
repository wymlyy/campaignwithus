import { useState, useEffect } from 'react';
import Axios from 'axios';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });

  };

  const handleSubmit = e => {
    e.preventDefault();


    setErrors(validate(values));
    setIsSubmitting(true);

  };




  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();

        Axios.post('http://localhost:5000/register', {
          signupName: values.username, email: values.email, password: values.password
        });

      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
