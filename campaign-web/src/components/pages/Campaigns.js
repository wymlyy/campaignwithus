import React, { useEffect, useState } from "react";
import '../../App.css';
import '../Cards.css';
import CardItem from '../CardItem';
import moment from "moment";
import axios from "axios";


export default function Campaigns() {
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
    <>
      <div className='campaigns'>
        <div className='overlay'>
          <h1 className='campaignTitle'>Campaigns</h1>
        </div>
      </div>

      <div className='cards'>
        <div className='cards__container'>
          <div className='cards__wrapper' >

            <ul className='cards__items_campaign'>
              {listOfPosts.reverse().map((value, key) => {
                return (

                  <div className='campaignCard' key={key}>
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
          </div>
        </div>
      </div>
    </>
  )
}
