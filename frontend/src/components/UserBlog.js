import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

function UserBlog() {
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((error)=> console.log(error))
    const data = await res.data;
    return data
  }
  useEffect(() => {
    sendRequest().then((data)=>setUser(data.user))
  })
  console.log(user);
  return (
    <div>
      {" "}
      {user && user.blogs &&
       user.blogs.map((blog, index) => (
        <Blog key={index}
          id={blog._id}
          isUser={true}
          title={blog.title} 
          description={blog.description} 
          imageCloud={blog.image} 
          userName={user.name} />
      ))}
    </div>
  )
}

export default UserBlog;
