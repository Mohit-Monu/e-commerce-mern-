import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Store from "./pages/Store/Store";
import ShowProduct from "./pages/Store/ShowProduct"
import Cart from "./pages/Cart/Cart"
import MyAccount from "./pages/MyAccount/MyAccount"
import MyOrders from "./pages/MyOrders/MyOrders"
import Order from "./pages/Order/Order"
import MySingleOrder from "./pages/MyOrders/MySingleOrder"
import CategoryProduct from "./pages/Store/CategoryProduct"
import { useSelector } from "react-redux";
import ForgetPassword from "./pages/Auth/ForgetPassword"
import ResetPassword from "./pages/Auth/ResetPassword"
import PageNotFound from "./components/PageNotFound/PageNotFound"
function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home/>:<Navigate to="../login"/>}/>
          <Route path="/login" element={user ? <Navigate to="../"/>:<Auth/>}/>
          <Route path="/forgetpass" element={user ? <Navigate to="../"/>:<ForgetPassword/>}/>
          <Route path="/resetpassword/:id" element={user ? <Navigate to="../"/>:<ResetPassword/>}/>
          <Route path="/store" element={user ? <Store/>:<Navigate to="../login"/>}/>
          <Route path="/cart" element={user ? <Cart/>:<Navigate to="../login"/>}/>
          <Route path="/account" element={user ? <MyAccount/>:<Navigate to="../login"/>}/>
          <Route path="/myorder" element={user ? <MyOrders/>:<Navigate to="../login"/>}/>
          <Route path="/myorder/:orderId" element={user ? <MySingleOrder/>:<Navigate to="../login"/>}/>
          <Route path="/order" element={user ? <Order/>:<Navigate to="../login"/>}/>
          <Route path="/store/:category" element={user ? <CategoryProduct/>:<Navigate to="../login"/>}/>
          <Route path="/store/:category/:ProductId" element={user ? <ShowProduct/>:<Navigate to="../login"/>}/>
          <Route path="*" element= {<PageNotFound/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
