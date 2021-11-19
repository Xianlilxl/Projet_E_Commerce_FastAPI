import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profilescreen from "./components/Profile";
import AdminScreen from "./components/Admin";
import Panier from "./components/Panier";
import AddProduct from "./components/AddProduct";
import Editproduct from "./components/EditProduct";
import ProductDetail from "./components/ProductDetail";
import UserList from "./components/UserList";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/inscription" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profilescreen} />
        <Route path="/admin" component={AdminScreen} />
        <Route path="/panier" component={Panier} />
        <Route path="/produit/:produit_id" exact component={ProductDetail} />
        <Route path="/ajoutproduit" component={AddProduct} />
        <Route path="/modifproduit/:produit_id" component={Editproduct} />
        <Route path="/listeutilisateurs" component={UserList} />
      </Switch>
    </div>
  );
};

export default App;