import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Box, Button, Tab, Tabs } from "@mui/material";
import { authActions } from '../store'
import { useStyles } from './utils';

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [value, setvalue] = useState();
  return (
    <AppBar 
      position='sticky' 
      sx={{ 
        background:
         "linear-gradient(90deg, rgba(58,157,180,1) 2%, rgba(0,58,161,1) 36%, rgba(0,58,161,1) 73%, rgba(69,187,252,1) 100%)"
      }}
    >
        <Toolbar>
            <Typography className={classes.font} variant='h4'>FoodBlogsApp</Typography>
            { isLoggedIn && <Box display='flex' marginLeft={'auto'} marginRight={'auto'}>
              <Tabs 
                textColor='inherit' 
                value={value} 
                onChange={(e, val) => setvalue(val)} 
              >
                <Tab className={classes.font} LinkComponent={Link} to='/blogs' label='All Blogs'/>
                <Tab className={classes.font} LinkComponent={Link} to='/myBlogs' label='My Blogs'/>
                <Tab className={classes.font} LinkComponent={Link} to='/blogs/add' label='Add Blog'/>
              </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
                {!isLoggedIn && <> <Button LinkComponent={Link} to='/auth' variant='contained' sx={{margin: 1, borderRadius: 10}} color='warning'>Login</Button>
                <Button LinkComponent={Link} to='/auth' variant='contained' sx={{margin: 1, borderRadius: 10}} color='warning'>Signup</Button> </> }
                { isLoggedIn &&
                 <Button 
                  onClick={()=> dispatch(authActions.logout())}
                  LinkComponent={Link} 
                  to='/auth' 
                  variant='contained' 
                  sx={{margin: 1, borderRadius: 10}}
                   color='warning'
                   >
                     Logout
                   </Button>
                }
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header
