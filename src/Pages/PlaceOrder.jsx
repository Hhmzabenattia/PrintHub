import {React, useEffect, useState} from "react";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Footer2 from "./../components/Footer2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import styled from "styled-components";
import { createOrder } from "../Redux/Actions/OrderActions";
import Message from "./../components/LoadingError/Error";
import CheckoutSteps from "../components/CheckoutSteps";
import { Navigate } from "react-router-dom";
import MetaData from "../components/MetaData";
import { Alert } from "@mui/material";

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Modifer = styled.div`
  font-size: 15px;
  font-weight: 150;
`;

const Wrapper = styled.div`
  padding: 20px;
  padding-bottom:50px ;
`;
const Container = styled.div``;

const PaimentMethode = styled.div`
display:flex ;
margin: 20px ;
`;


const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  border: 0.8px solid lightgray;
  width:99% ;
  border-radius: 10px;

`;

const ProductDetail = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 60px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.div`
  font-weight: bold;
  margin-top:10px ;
  margin-bottom:5px ;
  `;


const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 35vh;
  background-color: white;
`;


const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 200px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Empty = styled.div`
  display: flex;
  color: black;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  margin: 30px;
  margin-right: 30px;
`;

const WrapperVide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px;
  background-color: #f2f2f2;
`;


const PlaceOrder = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
   navigate('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');


 // Calculate Price
 const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

cart.paymentMethod=paymentMethod;
cart.itemsPrice = addDecimals(
  cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
);
cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 7);
cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
cart.totalPrice = (
  Number(cart.itemsPrice) +
  Number(cart.shippingPrice) +
  Number(cart.taxPrice)
).toFixed(2);

const orderCreate = useSelector((state) => state.orderCreate);
const { order, success, error } = orderCreate;

useEffect(() => {
    if (success) {
      navigate(`/order/pay/${order._id}`)
      
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, order]);



  const checkOutHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      );
  };





  return (
    <>
    {cartItems.length > 0 ? (
        <>
                              <MetaData title={"Confirmation de commande"} />

          <Container>
            <Header />

            <Top> 
          
            </Top>

            <Wrapper>
            <CheckoutSteps step1 step2 step3 />
              <Bottom>
                <Info>
                <ProductName> Order Items    </ProductName>


                 
                    <>
                      <Product> {cartItems.map((item) => (
                        <ProductDetail>
                          <Link to={`/product/${item.product}`}>
                            <Image  src={item.image} />
                          </Link>
                          <Details>
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                              to={`/product/${item.product}`}
                            >
                              <ProductDetail>{item.name}</ProductDetail>
                              <ProductDetail>x{item.qty}  </ProductDetail>

                            </Link>
                          </Details>
                          
                        </ProductDetail>
                       
                            ))}
<PriceDetail>
                          <Link to='/cart'>
                            <Modifer>
                              Modifer
                            </Modifer>
                            </Link>
                        </PriceDetail>

                      </Product>
                    </>
              
              
                    <ProductName> Livraison   </ProductName>
                    <Product>
                        <ProductDetail>
                          <Details>
                            
                              <ProductDetail>Nom: {cart.shippingAddress.fullname}</ProductDetail>
                              <ProductDetail>Adresse: {cart.shippingAddress.address}{" "}{cart.shippingAddress.postalCode}{" "}{cart.shippingAddress.country} </ProductDetail>
                              <ProductDetail>Num Tél: {userInfo.user.phonenum} {" "}</ProductDetail>

                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <Link to='/shipping'>
                            <Modifer>
                              Modifer
                            </Modifer>
                            </Link>
                        </PriceDetail>
                      </Product>

                    <ProductName> Méthode de payment   </ProductName>
                      <Product>
                        
            <PaimentMethode>
                      <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
              <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" alt="PayPal" />
              </PaimentMethode>

              <PaimentMethode>
                      <input
              type="radio"
              id="creditcard"
              value="CreditCard"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
              <img
                        src="https://www.merchantequip.com/image/?logos=v|m|d&height=32" alt="Merchant Equipment Store Credit Card Logos"/>
              </PaimentMethode>


                      </Product>
               
                </Info>
                <Summary>
                  <SummaryItem>
                    <SummaryItemText>
                      {cartItems.length} articles{" "}
                    </SummaryItemText>
                    <SummaryItemPrice>{cart.itemsPrice} TND</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Livraison</SummaryItemText>
                    <SummaryItemPrice>{cart.shippingPrice >0 ? <>{cart.shippingPrice} TND</> : <>gratuit</>}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>TOTAL (HT)</SummaryItemText>
                    <SummaryItemPrice>{(Number(total)+Number(cart.shippingPrice)).toFixed(2)} TND</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>TAXES</SummaryItemText>
                    <SummaryItemPrice>{cart.taxPrice} TND</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem type="total">
                    <SummaryItemText>TOTAL TTC</SummaryItemText>
                    <SummaryItemPrice>{cart.totalPrice} TND</SummaryItemPrice>
                  </SummaryItem>

               <Button  style={{ margin: "10px 90px"}} onClick={checkOutHandler}>Passer au Paiment</Button>
                 
                  {error && (
                    <Alert severity="error">{error}</Alert>

              )}
                 
                </Summary>
              </Bottom>
            </Wrapper>
            <Footer />
            <Footer2 />
          </Container>
        </>
          ) : (
        <>
          <Header />
          <WrapperVide>
            <Empty> Il n'y a plus d'articles dans votre panier</Empty>

            <Link to="/products">
              <Button>Continue mes achats</Button>
            </Link>
          </WrapperVide>
          <Footer />
          <Footer2 />
        </>
         )}
    </>
  );
};

export default PlaceOrder;