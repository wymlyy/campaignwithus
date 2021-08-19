import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import Footer from '../Footer';
import '../../App.css';

export default function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:5000/posts/byUserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        window.location.href = '/my-profile';
      });

  };

  return (
    <>
      <div className='Profile'>
      <h1> Username: {username} </h1>
        <img className='userImg' src='images/user.png' alt='user' />
        {/* <input type="file" className="uploadPic" name='avatar' accept="image/*" onChange={(e) => { handleFile(e) }} /> */}
        </div>
      <div className="listOfPosts">
        {listOfPosts.reverse().map((value, key) => {
          return (
            <div key={key} className="postList">
              <div className='listHeader'>
                <div className="profileTitle"> Title: {value.title} </div>
                <div className='profilePostDate'>
                  {moment(value.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                </div>
              </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
              </div>
              <div className="listFooter">
                <div className='footerBtn'>
                  <button className='viewBtn' onClick={() => {
                    history.push(`/post/${value.id}`);
                  }}> View</button>
                  {authState.username === value.username &&
                    (<button className='deleteBtn' onClick={() => deletePost(value.id)}>Delete</button>)}
                </div>
                <div className="footerSign">
                  <label>Signatures: {value.Signatures.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  )

}
