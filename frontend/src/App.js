import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AddBlog from "./components/AddBlog";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";
import Header from "./components/Header";
import UserBlog from "./components/UserBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
   const isLoggedIn = useSelector(state => state.isLoggedIn);
   console.log(isLoggedIn);
   useEffect(() => {
     if (localStorage.getItem("userId")){
       dispatch(authActions.login())
     }
   }, [dispatch]);
  return <React.Fragment>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
        { !isLoggedIn ? <Route path="/auth" element={<Auth />} /> :
        <><Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/add" element={<AddBlog/>}/>
        <Route path="/myBlogs" element={<UserBlog />} />
        <Route path="/myBlogs/:id" element={<BlogDetail />} /> </>}
    </Routes>
    </main>

  </React.Fragment>
}

export default App;