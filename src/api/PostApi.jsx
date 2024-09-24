import axios from "axios";

const api = axios.create({
    baseURL : "https://jsonplaceholder.typicode.com",
});

//post method
export const postData = (post) => {
    return api.post("/posts", post);   // post = payload, jo hume add krna hai
};

// get method
export const getPost = () => {
    return api.get("/posts");
}
  
//put method
export const updateData = (id, post) => {
    return api.put(`/posts/${id}`, post);
};

// delete method
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
};