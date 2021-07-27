import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from "axios";
import moment from 'moment';
import { useEffect, useState } from "react";


function Cards() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [signedPosts, setSignedPosts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      axios.get("http://localhost:5000/posts/visitors").then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setSignedPosts(response.data.signedPosts.map((sign) => {
          return sign.PostId;
        }))
      });
    } else {
      axios.get("http://localhost:5000/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setSignedPosts(response.data.signedPosts.map((sign) => {
          return sign.PostId;
        }))
      });
    }

  }, []);

  const signAPost = (postId) => {
    axios.post("http://localhost:5000/signatures", {
      PostId: postId
    },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    ).then((response) => {
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.signed) {
            return { ...post, Signatures: [...post.Signatures, 0] };
          } else {
            const signatureArray = post.Signatures;
            signatureArray.pop();
            return { ...post, Signatures: signatureArray };
          }
        } else {
          return post;
        }
      })
      );

      if (signedPosts.includes(postId)) {
        setSignedPosts(
          signedPosts.filter((id) => {
            return id != postId;
          })
        );
      } else {
        setSignedPosts([...signedPosts, postId]);
      }
    });
  };

  const vistorClick = () => {
    window.location.href = '/login';
  }
  return (
    <div className='cards'>
      <h1>Check out these fantastic Campaigns!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper' >

          <ul className='homeCards_campaign'>
            {listOfPosts.slice(listOfPosts.length - 2, listOfPosts.length).reverse().map((value, key) => {
              return (
                <div className='homeCard' key={key}>
                  <CardItem key={key}
                    src='images/img-9.jpg'
                    title={value.title}
                    text={value.postText}
                    topic={value.topic}
                    username={value.username}
                    dateTime={moment(value.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    path={`/post/${value.id}`}
                  />
                  <div className='signContainer'>

                    {localStorage.getItem("accessToken") ? (
                      <div>
                        {!signedPosts.includes(value.id) ? (<button className='btnSign' onClick={() => {
                          signAPost(value.id);
                        }}>Sign</button>) :
                          (<button className='btnSigned' onClick={() => {
                            signAPost(value.id);
                          }}>Signed</button>)}
                        <label className='signNo'>{value.Signatures.length}</label>
                      </div>
                    ) :
                      (
                        <div>
                          <button className='btnSign' onClick={vistorClick}>Sign</button>
                          <label className='signNo'>{value.Signatures.length}</label>
                        </div>
                      )}
                  </div>
                </div>
              )
            })}
          </ul>
          <ul className='cards__items'>
            {listOfPosts.filter((item, index)=>
              index>=listOfPosts.length-5 && index<=listOfPosts.length-3
            ).reverse().map((value, key) => {
              return (

                <div className='homeCard2' key={key}>
                  <CardItem key={key}
                    src='images/img-9.jpg'
                    title={value.title}
                    text={value.postText}
                    topic={value.topic}
                    username={value.username}
                    dateTime={moment(value.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    path={`/post/${value.id}`}
                  ></CardItem>
                  <div className='signContainer'>
                    {localStorage.getItem("accessToken") ? (
                      <div>
                        {!signedPosts.includes(value.id) ? (<button className='btnSign' onClick={() => {
                          signAPost(value.id);
                        }}>Sign</button>) :
                          (<button className='btnSigned' onClick={() => {
                            signAPost(value.id);
                          }}>Signed</button>)}
                        <label className='signNo'>{value.Signatures.length}</label>
                      </div>
                    ) :
                      (
                        <div>
                          <button className='btnSign' onClick={vistorClick}>Sign</button>
                          <label className='signNo'>{value.Signatures.length}</label>
                        </div>
                      )}
                  </div>

                </div>

              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
