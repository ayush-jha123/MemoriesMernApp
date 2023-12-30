import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import NavBar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import PostDetails  from './Components/PostDetails/PostDetails';
export default function App() {
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <NavBar />
        <Switch>
          <Route path='/' exact component={()=><Redirect to="/posts"/>}/>
           <Route path="/posts" exact component={Home}/>
           <Route path="/posts/search" exact component={Home}/>
           <Route path="/posts/:id" component={PostDetails}/> 
           {/* :id means id is dynamically allocated. */}
          <Route path='/auth' exact component={()=>(!user? <Auth/> : <Redirect to="/posts"/>)}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
