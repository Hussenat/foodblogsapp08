import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './utils';

const labelStyles = { mb:1, mt:2, fontSize: '24px', fontWeight:'bold' }
function AddBlog() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [inputs, setInputs] = useState({
    title: "", description: "", url
  });
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }));
  }

  const sendRequest = async () => {
    const res = await axios.post("https://food-blogs-app08.herokuapp.com/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: url,
      user: localStorage.getItem("userId")
    }).catch((error)=>console.log(error))
    const data = await res.data;
    return data;
  }

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'foodBlogImages')
    setLoading(true)

    const res = await fetch("https://api.cloudinary.com/v1_1/hussenat-images/image/upload", 
    {
      method: 'POST',
      body: data
    })

    const file = await res.json()
    console.log(file)

    setUrl(file.secure_url)
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs); 
    sendRequest()
    .then((data) => console.log(data))
    .then(() => navigate("/myBlogs/"));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          border={3} 
          borderColor="linear-gradient(90deg, rgba(58,157,180,1) 2%, rgba(0,58,161,1) 36%, rgba(0,58,161,1) 73%, rgba(69,187,252,1) 100%)"
          borderRadius={10} 
          boxShadow="10px 10px 20px #ccc" 
          padding={3} 
          margin={'auto'} 
          marginTop={3}
          display="flex" 
          flexDirection={"column"} 
          width={"80%"} 
        >
          <Typography className={classes.font} fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}>Post Your Blog</Typography>
          <InputLabel className={classes.font} sx={labelStyles}>Title</InputLabel>
          <TextField className={classes.font} name="title" onChange={handleChange} value={inputs.title} margin='auto' variant='outlined' />
          <InputLabel className={classes.font} sx={labelStyles}>Description</InputLabel>
          <TextField className={classes.font} name="description" onChange={handleChange} value={inputs.description} margin='auto' variant='outlined' />
          <InputLabel className={classes.font} sx={labelStyles}>Choose Image</InputLabel>
          <input type="file" name="file" placeholder="Upload an Image" onChange={uploadImage} />
          { loading ? (
          <p>Loading ...</p>
          ):(
          <TextField className={classes.font} type="text" onChange={handleChange} value={url} margin='auto' variant='outlined' />
          )}
          <Button sx={{ mt:2, borderRadius:4 }} variant="contained" color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
