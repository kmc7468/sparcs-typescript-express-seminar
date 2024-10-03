import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import FeedPage from "./pages/feed";
import SSRPage from "./pages/ssr";
import PageNotFound from "./pages/404";
import Footer from "./components/footer";
import './App.css';
import AccountPage from "./pages/account";
import CatImagePage from "./pages/cat-image";

/***************************
 * Assignment #4: Added a new router that includes CRUD.
 * ---------------
 * <To do>
 * - Implement BE for todo router
 *   - Implement schema validation (Done)
 *   - Implement routers (Done)
 *   - Test and Debug
 * - Implement FE for todo router
 *   - Implement req-res handling
 *   - Implement user interaction
 *   - Design (really??)
 * - Test TodoDB
 * - Link to homepage
 * <Done>
 * - Write TodoDB
 ****************************/

import TodoPage from "./pages/todo";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/feed" element={ <FeedPage/> }/>
          <Route path="/account" element={ <AccountPage/> }/>
          <Route path="/cat-image" element={ <CatImagePage/> }/>
          <Route path="/ssr" element={ <SSRPage/> }/>
          <Route path="/todo" element={ <TodoPage/> }/>
          <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
