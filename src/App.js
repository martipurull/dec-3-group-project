import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, Route } from "react-router-dom";
import ProductList from "./views/productList/ProductList";
import ProductDetails from "./views/productList/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Route path="/" exact component={Home} />


      <Route path="/products" exact component={ProductList} />
      <Route path="/product/:id" exact component={ProductDetails} />


        
      <Footer />
    </BrowserRouter>
  );
}

export default App;
