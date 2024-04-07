import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Shipping from "./component/cart/Shipping";
import UsersList from "./component/admin/Tables/UsersList";
import Home from "./component/home/Home";
import Profile from "./component/profile/Profile";
import Footer from "./component/layout/Footer";
import Login from "./component/user/Login";
import SignUp from "./component/user/SignUp";
import ForgetPassword from "./component/user/ForgetPassword";
import toast, { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react";
import { loadUser } from "./Redux/action/user";
import Loader from "./component/layout/Loader";
import NewProduct from "./component/admin/Product/CreateNewProduct";
import ProductsPage from "./component/product/ProductsPage";
import ChangePassword from "./component/user/ChangePassword";
import ProductDetails from "./component/product/ProductDetails";
import ProductList from "./component/admin/Tables/ProductList";
import OrderLisr from "./component/admin/Tables/OrderList";
import MyOrders from "./component/order/MyOrders";
import Cart from "./component/cart/Cart";
import UpdateProduct from "./component/admin/Product/UpdateProduct";
import UpdateUser from "./component/admin/UpdateUser";
import OrderDetails from "./component/order/OrderDetails";
import OrderSummary from "./component/cart/OrderSummary";
import Payment from "./component/cart/Payment";
import NotFound from "./component/layout/NotFound";
import LineChart from "./component/admin/Dashboard/Chart";
import DoughnutChart from "./component/admin/Dashboard/DoughnutChart";
import Search from "./component/layout/Search";
import OrderStatus from "./component/admin/OrderStatus";
import Dashboard from "./component/admin/Dashboard/Dashboard";
import WishList from "./component/profile/WishList";
import "./Styles/app.scss";

function App() {
  const { isAuthenticated, error, message, user, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products/:keyword" element={<ProductsPage />} />
            <Route path="/products/:category" element={<ProductsPage />} />
            <Route path="/products/:search" element={<ProductsPage />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect={
                    user && user.role === "admin" ? "/admin/dashboard" : "/me"
                  }
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <WishList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doughnutchart"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DoughnutChart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/linechart"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <LineChart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === "admin"}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/productlist"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === "admin"}
                >
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/product/:id"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === "admin"}
                >
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === "admin"}
                >
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/newproduct"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === "admin"}
                >
                  <NewProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/userslist"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === "admin"}
                >
                  <UsersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orderslist"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === "admin"}
                >
                  <OrderLisr />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/order/:id"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === "admin"}
                >
                  <OrderStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/me"
                >
                  <SignUp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orderdetails/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myorder"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/OrderSummary"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <OrderSummary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/process/payment"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Payment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/forgetpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/me"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;