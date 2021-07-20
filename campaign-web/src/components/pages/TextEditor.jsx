import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./textEditor.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from 'axios';


const TextEditor = () => {
  const [userName, setUserName] = useState("");
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }
  const content = stateToHTML(editorState.getCurrentContent());
  // const content = JSON.stringify(convertToRaw(content));

  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const myCurrentDate = new Date();
  const datePosted = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth() + 1) + '-' + myCurrentDate.getDate() + ' ' + myCurrentDate.getHours() + ':' + myCurrentDate.getMinutes() + ':' + myCurrentDate.getSeconds();

  const submitPost = () => {
    Axios.post('http://localhost:5000/post', {
      userName: userName, topic: topic, title: title, content: content, location: location, startDate: startDate, datePosted: datePosted
    });
    document.getElementById("postForm").reset();

  }

  const uploadCallback = (file) => {
    return new Promise(
      (resolve, reject) => {
        if (file) {
          let reader = new FileReader();
          reader.onload = (e) => {
            resolve({ data: { link: e.target.result } })
          };
          reader.readAsDataURL(file);
        }
      }
    );
  }

  return (
    <div>
      <form id='postForm'>
        <h1 className='postPageTitle'>Create Your Own Campaign !</h1>
        <div className='selectInfo'>
          <div className='selectTopic'>
            <label>Select One Topic:</label>
            <select className='topic' onChange={(e) => { setTopic(e.target.value) }}>
              <option value='none' hidden>Select a topic</option>
              <option value='sports'>Sports</option>
              <option value='Marketing'>Marketing</option>
              <option value='education'>Education</option>
              <option value='society'>Society</option>
            </select>
          </div>
          <div className='selectTime'>
            <label>Select Date and Time:</label>
            <DatePicker className='datepick'
              dateFormat="yyyy-MM-dd HH:mm"
              timeFormat="hh:mm"
              selected={startDate}
              onChange={(date) => setStartDate(date)} showTimeSelect
            />
          </div>
        </div>
        <div className="otherInfo">
          <div className="campaignLocation">
            <label>Location:</label>
            <input className='locationInput' type="text" onChange={(e) => { setLocation(e.target.value) }} />
          </div>
          <div className="authorName">
            <label>Author Name:</label>
            <input type="text" className="author" onChange={(e) => { setUserName(e.target.value) }} />
          </div>
        </div>

        <div className="postTitle">
          <label>Title:</label>
          <input type="text" className="titleInput" onChange={(e) => { setTitle(e.target.value) }} />
        </div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadEnabled: true,
              uploadCallback: uploadCallback,
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
          }}
        />
        <button className='postButton' type='submit' onClick={submitPost}>
          Post
        </button>
      </form>

    </div>
  );

}
export default TextEditor;