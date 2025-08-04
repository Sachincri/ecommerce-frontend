import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import Header from "../layout/Header";
const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "addShippingInfo",
      payload: {
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      },
    });

    localStorage.setItem(
      "shippingInfo",
      JSON.stringify({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );

    navigate("/OrderSummary");
  };

  return (
    <>
      <Header />
      <main className="shipping">
        <CheckoutSteps activeStep={0} />
        <section>
          <h2>Shipping Details</h2>
          <form onSubmit={submitHandler}>
            <div>
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter House No."
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                placeholder="Enter City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label>Country</label>

              <input
                type="text"
                placeholder="Enter Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>


            <div>
              <label>State</label>
              <input
                type="text"
                placeholder="Enter State"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div>
              <label>Pin Code</label>
              <input
                type="number"
                placeholder="Enter Pincode"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div>
              <label>Phone No.</label>
              <input
                type="number"
                placeholder="Enter Phone No."
                value={phoneNo}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <button type="submit">Next</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Shipping;
