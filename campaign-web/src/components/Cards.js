import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from "axios";
import { useEffect, useState } from "react";


function Cards() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      setListOfPosts(response.data);


    })
  }, []);

  return (
    <div className='cards'>
      <h1>Check out these fantastic Campaigns!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper' >

          <ul className='cards__items'>
            {listOfPosts.slice(0, 2).map((value, key) => {
              return (

                <CardItem key={key}
                  src='images/img-9.jpg'
                  title={value.title}
                  text={value.postText}
                  topic={value.username}
                  path={`/post/${value.id}`}
                />

              )
            })}
          </ul>
          <ul className='cards__items'>
            {listOfPosts.slice(2, 5).map((value, key) => {
              return (

                <CardItem key={key}
                  src='images/img-9.jpg'
                  title={value.title}
                  text={value.postText}
                  topic={value.username}
                  path={`/post/${value.id}`}
                />

              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
