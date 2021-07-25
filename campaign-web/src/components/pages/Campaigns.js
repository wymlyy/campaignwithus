import React, { useEffect, useState } from "react";
import '../../App.css';
import '../Cards.css';
import CardItem from '../CardItem';
import axios from "axios";


export default function Campaigns() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((response) => {
      setListOfPosts(response.data);


    })
  }, []);
  return (
    <>
      <h1 className='campaigns'>Campaigns</h1>
      <div className='cards'>
        <div className='cards__container'>
          <div className='cards__wrapper' >

            <ul className='cards__items_campaign'>
              {listOfPosts.map((value, key) => {
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
    </>
  )
}
