import React, { useEffect } from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/action/cart";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllProducts } from "../../Redux/action/productAction";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const deliveryCharges = cartItems.price > 1000 ? 0 : 40;
  const { shippingInfo } = useSelector((state) => state.cart);
  console.log(shippingInfo);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item Remove");
  };

  const checkoutHandler = () => {
    if (shippingInfo.address !== undefined) {
      navigate("/confirmorder");
    } else {
      navigate("/shipping");
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <h1>No Product in Your Cart</h1>
          <MdOutlineRemoveShoppingCart />
          <Link to="/">
            <button>View Products</button>
          </Link>
        </div>
      ) : (
        <>
          <main className="cart">
            <section>
              <div>
                <h3>CartItems</h3>
                <p>
                  <p>
                    Deliver to:{" "}
                    <b>
                      {shippingInfo.city} - {shippingInfo.pinCode}
                    </b>
                  </p>
                  <Link to="/shipping">change</Link>
                </p>
                <div>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.product}>
                        <CartItemCard
                          item={item}
                          deleteCartItems={deleteCartItems}
                          decreaseQuantity={() =>
                            decreaseQuantity(item.product, item.quantity)
                          }
                          increaseQuantity={() =>
                            increaseQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                        />
                      </div>
                    ))}
                </div>
              </div>
              <aside>
                <h3>PRICE DETAILS</h3>
                <div>
                  <p>Price ({cartItems.length} item)</p>
                  <p>
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toLocaleString()}
                  </p>
                </div>
                <div>
                  <p>Discount </p>
                  <p style={{ color: "green" }}>
                    -{" "}
                    {cartItems
                      .reduce(
                        (sum, item) =>
                          sum +
                          item.cuttedPrice * item.quantity -
                          item.price * item.quantity,
                        0
                      )
                      .toLocaleString()}
                  </p>
                </div>
                <div>
                  <p>Delivery Charges</p>
                  <p>{deliveryCharges}</p>
                </div>
                <span>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - -
                </span>
                <div>
                  <p>Total Amount</p>
                  <p>
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toLocaleString()}
                  </p>
                </div>
                <span>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - -
                </span>
                <p>
                  {" "}
                  You will save ₹
                  {cartItems.reduce(
                    (sum, item) =>
                      sum +
                      (item.cuttedPrice * item.quantity -
                        item.price * item.quantity),
                    0
                  )}{" "}
                  on this order
                </p>
              </aside>
            </section>
            <section>
              <button onClick={checkoutHandler}>PlaceOrder</button>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Cart;
