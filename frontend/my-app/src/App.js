import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Login from './main_page/Login';
import Users from './administrator/Users';
import RecoverPass from './main_page/RecoverPass';
import Administrator from './administrator/Administrator'
import NewUser from './administrator/NewUser'
import NewSupplement from './administrator/NewSupplement';
import NewProduct from './administrator/NewProduct';
import CreateAccount from './main_page/CreateAccount';

import Home from './users/Home'
import NewProfile from './users/NewProfile';
import UserProfile from './users/UserProfile';
import UpdateProfile from './users/UpdateProfile'
import UpdateInfo from './users/UpdateInfo';
import SkinProduct from './products/Products';
import Products from './products/Products';
import Supplements from './products/Supplements';
import { RadioGroup } from '@material-ui/core';
import AllProducts from './products/AllProducts';
import MyWishlist from './users/MyWishlist';
import MyBasket from './users/MyBasket';
import ProductsA from './administrator/ProductsA';
import ProductDetails from './products/ProductDetails';




function App() {
  const defaultRoute = window.location.pathname === "/" ? <Redirect to="/poosh" /> : undefined;
  
  return (
    <Router>
      <Switch>
        <Route exact path="/poosh" component = {Login}/>
        <Route exact path="/poosh/recover-password" component = {RecoverPass}/>
        <Route exact path="/poosh/administrator" component = {Administrator}/>
        <Route exact path="/poosh/add-user" component = {NewUser}/>
        <Route exact path="/poosh/add-supplement" component = {NewSupplement}/>
        <Route exact path="/poosh/add-product" component = {NewProduct}/>
        <Route exact path="/poosh/create-account" component = {CreateAccount}/>
        <Route exact path="/poosh/manage-users" component = {Users}/>
        <Route exact path="/poosh/home" component = {Home}/>
        <Route exact path="/poosh/add-profile" component = {NewProfile}/>  
        <Route exact path="/poosh/my-profile" component = {UserProfile}/>
        <Route exact path="/poosh/update-profile" component ={UpdateProfile}/>
        <Route exact path="/poosh/account-details" component={UpdateInfo}/>
        <Route exact path="/poosh/allProducts" component={AllProducts}/>
        <Route exacat path="/poosh/MyWishlist" component={MyWishlist}/>
        <Route exact path="/poosh/MyBasket" component={MyBasket}/>
        <Route exact path="/poosh/manage-products" component={ProductsA}/>

      
        <Route exact path="/poosh/Skincare" component={Products}/>
        <Route exact path="/poosh/Supplements" component={Supplements}/>
     

      </Switch>
      {defaultRoute}
    </Router>

  );
}

export default App;
