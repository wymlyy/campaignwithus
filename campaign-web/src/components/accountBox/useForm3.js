import { useState, useEffect } from 'react';
import { EditorState,convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import Axios from 'axios';

const useForm3 = (callback, validate) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [startDate, setStartDate] = useState(new Date());
  // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  //   const postText = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
  const postText = stateToHTML(editorState.getCurrentContent());
  // const postText = postTextTags.replace(/<[^>]+>/g, '');


  const [values, setValues] = useState({
    topic: '',
    username: '',
    title: '',
    location: ''

  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  Axios.defaults.withCredentials = true;

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

  };

  const handleTime = (date) => {
    setStartDate(date);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values, postText));
    setIsSubmitting(true);

  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

  }


  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {

        Axios.post('http://localhost:5000/posts', { topic: values.topic, startDate: startDate, location: values.location, username: values.username, title: values.title, postText: postText }, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response) => {
          window.location.href = '/write';
        });

        Axios.post('http://localhost:5000/posts/visitors', { topic: values.topic, startDate: startDate, location: values.location, username: values.username, title: values.title, postText: postText }, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }).then((response) => {
          window.location.href = '/write';
        });

      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, onEditorStateChange, handleTime, startDate, editorState, values, errors };
};

export default useForm3;
