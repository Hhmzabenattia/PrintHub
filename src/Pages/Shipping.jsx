import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";
import { useNavigate } from "react-router-dom";

import { saveShippingAddress } from "../Redux/Actions/cartActions";
import "./shipp.css";
import CheckoutSteps from "../components/CheckoutSteps";
import MetaData from "../components/MetaData";


const Container= styled.div`
display:flex ;
justify-content:center ;
align-items:center ;
padding: 50px 0;
`;

const Form = styled.form`
padding:30px ;
`;


const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullname, setFullname] = useState(shippingAddress.fullname);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);



  const navigat = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country , fullname }));
    navigat("/placeorder");
  };
  return (
    <>
                      <MetaData title={"Adresse de livraison"} />

      <Header />
      <Container className="container d-flex justify-content-center align-items-center login-center">
        <Form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
                  <CheckoutSteps step1 step2> </CheckoutSteps>

          <h3> ADDRESSE DE LIVRAISON</h3>
          <input
            type="text"
            placeholder="Full Name "
            value={fullname}
            required
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">Continue</button>
        </Form>
      
      </Container>
      <Footer/>
        <Footer2/>
    </>
  );
};

export default ShippingScreen;