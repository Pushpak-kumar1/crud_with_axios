
import { useEffect, useState } from "react";
import { getPost, deletePost } from "../api/PostApi";

import "../App.css";
import { Form } from "./Form";


    const Posts = () => {

    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});
    
    const getPostData = async () => {
        const res = await getPost();
        // console.log(res.data);
        setData(res.data);
    };
    
    useEffect( () => {
        getPostData();
    }, []);

    // Function to delete the posts
    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id);
            if (res.status === 200) {
                const newUpdatedPosts = data.filter( (curPost) => {
                    return curPost.id !== id;
                });
                setData(newUpdatedPosts);
            }  else {
                console.log("Failed to delete the post:", res.status);
              }
        } catch (error) {
            console.log(error);  
        } 
    }

    // handleUpdatePost
    const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

    return (
        <>

            <section className="section-form">
                <Form 
                    data={data} 
                    setData={setData} 
                    updateDataApi={updateDataApi}
                    setUpdateDataApi={setUpdateDataApi}
                />
            </section>

            <section className="section-post">
                <ol>
                    {
                        data.map((curElem) => {
                            const { id, body, title } = curElem;   // destructing the values
                            return (
                                <li key={id}>
                                    <p> Title: {title} </p>
                                    <p> Body: {body} </p>
                                    <button 
                                        className="btn-edit" 
                                        onClick={() => handleUpdatePost(curElem)} >
                                        Edit 
                                    </button>
                                    <button 
                                        className="btn-delete"
                                        onClick={() => handleDeletePost(id)} >
                                        Delete 
                                    </button>
                                </li>
                            )
                        })
                    }
                </ol>
            </section>

        </>
    )
};

export default Posts