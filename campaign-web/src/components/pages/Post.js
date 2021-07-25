import React, { useEffect, useState, useContext } from 'react';
import '../../App.css';
import { useParams } from 'react-router-dom';
import { Button } from '../Button';
import axios from "axios";
import { AuthContext } from '../../Context/AuthContext';

export default function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:5000/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);
    const addComment = () => {

        axios.post("http://localhost:5000/comments/", { commentText: newComment, PostId: id },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const commentAdd = {
                        commentText: newComment,
                        username: response.data.username
                    };
                    setComments([...comments, commentAdd]);
                    setNewComment("");
                }

            })
    };

    const deleteComment = (id) => {

        axios.delete(`http://localhost:5000/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id != id;
                    })
                );
            });
    };

    const deletePost = (id) => {
        axios
            .delete(`http://localhost:5000/posts/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                window.location.href = '/';
            });
    };

    return (
        <>
            <h1 className='campaigns'>{postObject.title}</h1>
            <div className='lineOne'>
                <div className='postTopic'>{postObject.topic}</div>
                <div className='postLocation'>{postObject.location}</div>
            </div>
            <div className='lineTwo'>
                <div className='camTime'>{postObject.startDate}</div>
                <div className='nameAuthor'>{postObject.username}</div>
            </div>
            <div className='postText'>
                <div className='textContent'>{postObject.postText}</div>
                <div className="footer">
                    {postObject.username}
                    {authState.username === postObject.username && (
                        <button
                            onClick={() => {
                                deletePost(postObject.id);
                            }}
                        >
                            {" "}
                            Delete Post
                        </button>
                    )}
                </div>
            </div>
            <div className="comments">
                <h1>Comments</h1>
                <div className='addComment'>
                    <input type='text' placeholder="Add your comment here..." autoComplete="off" value={newComment} onChange={(event) => { setNewComment(event.target.value) }} />
                </div>
                <button className='postButton' type='submit' onClick={addComment}>
                    Comment
                </button>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                <label className='commentUser'>User:{comment.username}</label>
                                {comment.commentText}
                                {authState.username === comment.username && (<button onClick={() => {
                                    deleteComment(comment.id);
                                }}>Delete</button>)}
                            </div>
                        );
                    })}
                </div>
            </div>

        </>
    );

}
