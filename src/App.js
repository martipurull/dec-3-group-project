import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, Route } from "react-router-dom";
import ProductsBackOffice from "./components/ProductsBackOffice";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/backOffice" exact component={ProductsBackOffice} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
