import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Products from "./Pages/Products";
import NotFound from "./Pages/NotFound";
import SinglProduct from "./Pages/SinglProduct";
import About from "./Pages/About";
import PrivateRouter from './PrivateRouter';
import Profile from "./Pages/User/Profile";
import Shipping from "./Pages/Shipping";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import Sucess from "./Pages/Sucess";
import OrderPay from "./Pages/OrderPay";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrder from "./Pages/User/MyOrder";
import ForgotPassword from "./Pages/User/ForgotPassword";
import ResetPassword from "./Pages/User/ResetPassword";
import Facture from "./Pages/Facture";
import Livraison from "./Pages/Livraison";
import Mentionslegales from "./Pages/Mentionslegales";
import Test from "./Pages/Test";


function App() {
  let token = window.localStorage.getItem("userInfo");


  const promise = loadStripe(
    "pk_test_51KjobLDV9S7PwoyMkJaEUeNjhFkGe1wPyl2yrcZeTt2Cz9ZyqimoSYLKW24AKeCyXzRjuCxjgpGJ61Oa7FxB3nlL00aQ1kIKt5"
  );
  

  return (
    <Routes>
    <Route path="/" exact element={<Home />} />
    <Route path="/signup" exact element={token ? <Navigate to ="/"/>  : <Signup />} />
    <Route path="/login" exact element={token ? <Navigate to ="/"/> : <Login/>} />
    <Route path="/profile" element={<PrivateRouter>   <Profile /> </PrivateRouter>}/>   
    <Route path="/myorder" element={<PrivateRouter>   <MyOrder /> </PrivateRouter>}/>   
    <Route path="/password/forgot" exact element={token ? <Navigate to ="/"/>  :  <ForgotPassword/>} />
    <Route path="/password/reset/:token" element={token ? <Navigate to ="/"/>  : <ResetPassword />} />
    <Route path="/products" exact element={<Products/>} />
    <Route path="/product/:id" exact element={<SinglProduct/>} />
    <Route path="/products/category/:category" element={<Products />} />
    <Route path="/about" element={<About />}/>   
    <Route path="/cart/" element={<Cart/>}/>   
    <Route path="/shipping" element={<PrivateRouter>  <Shipping/></PrivateRouter>}/>   
    <Route path="*" exact element={<NotFound/>} />
    <Route path="/placeorder" exact element={<PrivateRouter><PlaceOrder/></PrivateRouter>}/>
    <Route path="/order/pay/:d" exact element={<PrivateRouter> <Elements stripe={promise}> <OrderPay/> </Elements></PrivateRouter>}/>
    <Route path="/success" exact element={<Sucess/>}/>
    <Route path="/facture/:id" element={<PrivateRouter>  <Facture/></PrivateRouter>}/>   
    <Route path="/livraison" exact element={<Livraison />} />
    <Route path="/mentions-legales" exact element={<Mentionslegales/>} />
    <Route path="/test" exact element={<Test/>} />




  </Routes>
  );
}

export default App;
