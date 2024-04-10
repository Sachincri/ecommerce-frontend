import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "protected-route-react";
import { loadUser } from "./Redux/action/user";
import Loader from "./component/layout/Loader";
const Login = lazy(() => import("./component/user/Login"));
const SignUp = lazy(() => import("./component/user/SignUp"));
const Shipping = lazy(() => import("./component/cart/Shipping"));
const Home = lazy(() => import("./component/home/Home"));
const Profile = lazy(() => import("./component/profile/Profile"));
const Footer = lazy(() => import("./component/layout/Footer"));
const ForgetPassword = lazy(() => import("./component/user/ForgetPassword"));
const NewProduct = lazy(() => import("./component/admin/Product/CreateNewProduct"));
const ProductsPage = lazy(() => import("./component/product/ProductsPage"));
const ChangePassword = lazy(() => import("./component/user/ChangePassword"));
const ProductDetails = lazy(() => import("./component/product/ProductDetails"));
const MyOrders = lazy(() => import("./component/order/MyOrders"));
const Cart = lazy(() => import("./component/cart/Cart"));
const UpdateProduct = lazy(() =>  import("./component/admin/Product/UpdateProduct"));
const UpdateUser = lazy(() => import("./component/admin/UpdateUser"));
const OrderDetails = lazy(() => import("./component/order/OrderDetails"));
const OrderSummary = lazy(() => import("./component/cart/OrderSummary"));
const Payment = lazy(() => import("./component/cart/Payment"));
const NotFound = lazy(() => import("./component/layout/NotFound"));
const Search = lazy(() => import("./component/layout/Search"));
const OrderStatus = lazy(() => import("./component/admin/OrderStatus"));
const WishList = lazy(() => import("./component/profile/WishList"));
const Dashboard = lazy(() => import("./component/admin/Dashboard/Dashboard"));
const UsersList = lazy(() => import("./component/admin/Tables/UsersList"));
const OrderLisr = lazy(() => import("./component/admin/Tables/OrderList"));
const ProductList = lazy(() => import("./component/admin/Tables/ProductList"));
const LineChart = lazy(() => import("./component/admin/Dashboard/Chart"));
const DoughnutChart = lazy(() =>
  import("./component/admin/Dashboard/DoughnutChart")
);

import("./Styles/app.scss");

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
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products/:keyword" element={<ProductsPage />} />
              <Route path="/products/:category" element={<ProductsPage />} />
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
          </Suspense>
        </>
      )}
    </Router>
  );
}

export default App;
