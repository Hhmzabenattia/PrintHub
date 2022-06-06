import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";
import Loading from "./../components/Loading";
import Message from "./../components/LoadingError/Error";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import Footer from "./../components/Footer";
import Footer2 from "./../components/Footer2";
import { useLocation } from "react-router";
import styled from "styled-components";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import MetaData from "../components/MetaData";



const Wrapper = styled.div`
  padding: 20px;
`;
const Container = styled.div``;



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


const PayPal = styled.div`
margin-top: 50px ;
margin-left: 20vh ;
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

const Stripe = styled.div`
margin-top: 50px ;
`;
const Button = styled.button`
margin-top:20px ;
 width: 200px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
`;

const StripeErr = styled.div`
margin-top: 15px ;
margin-left: 50px;
color: red ;
`




const OrderPay = () => {
  window.scrollTo(0, 0);

  let navigate = useNavigate();

  const location = useLocation();

  const [sdkReady, setSdkReady] = useState(false);
  const orderId = location.pathname.split("/")[3];

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading && !error) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

//Stripe

const [clientSecret, setClientSecret] = useState("");
const elements = useElements();
const stripe = useStripe();





  useEffect(() => {


    const fetchClientSecret = async () => {
      const data = await axios.post("/api/payment/stripe", {
        amount: Math.round(Number(order.totalPrice).toFixed(3)*100),
      });
      setClientSecret(data.data.ClientSecretId);
    
    }
    

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/payment/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));

    } else if (!order.isPaid) {
      fetchClientSecret();

      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    navigate("/success")
  };

const [StripeError,setStripeError] = useState("")

  const confirmPayment = async (e) => {
    e.preventDefault();
      await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
          card: elements.getElement(CardElement),
        },}).then(function(response) {
        if (response.error) {
          setStripeError(response.error.message);
        } else if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
          dispatch(payOrder(orderId, response.paymentIntent));
          navigate("/success")
        }
      });
      
    
  };


  return (
     <Container>
    <MetaData title={"Paiment"} />

            <Header />

            <Top> 
            </Top>   
            <CheckoutSteps step1 step2 step3 step4/>
             <Wrapper>
               

             { error ? (
              navigate("/notFound")
    ) : loading ? (
      <Loading />
    ) : order.isPaid ?(

      <>{navigate("/")}</>
    ): (
        <>
              <Bottom>
                <Info>
                <ProductName style={{  margin:"10px 5px"}}> Order Items    </ProductName>


                  {order.orderItems.map((item) => (
                    <>
                      <Product>
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
                      </Product>
                    </>
                  ))}
              
              <ProductName style={{  margin:"10px 5px"}}> Livraison   </ProductName>
                    <Product>
                        <ProductDetail>
                          <Details>
                              <ProductDetail>Nom: {order.shippingAddress.fullname}</ProductDetail>
                              <ProductDetail>Adresse: {order.shippingAddress.address}{" "}{order.shippingAddress.postalCode}{" "}{order.shippingAddress.country} </ProductDetail>
                              <ProductDetail>Num Tél: {order.user.phonenum} {" "}</ProductDetail>
                          </Details>
                        </ProductDetail>
                      </Product>
{order.paymentMethod ==="PayPal" ? (
<>
                      {!sdkReady ? (
                      <Loading />
                    ) : (
                      <PayPal>   
                                           <PayPalButton 
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}              
                      />
                      </PayPal>


                    )}
                    </>): (

<Stripe>
<CardElement options={{style: {
 
  },}}/>
  <StripeErr>{StripeError}</StripeErr>
<Button onClick={confirmPayment}>Pay </Button>
</Stripe>)}
                   

    
                </Info>
                <Summary>
                  <SummaryItem>
                    <SummaryItemText>
                      {order.orderItems.length} articles{" "}
                    </SummaryItemText>
                    <SummaryItemPrice>{order.itemsPrice} TND</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Livraison</SummaryItemText>
                    <SummaryItemPrice>{order.shippingPrice >0 ? <>{order.shippingPrice} TND</> : <>gratuit</>}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>TOTAL (HT)</SummaryItemText>
                    <SummaryItemPrice>{Number(order.itemsPrice) + Number(order.shippingPrice)}  TND</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>TAXES</SummaryItemText>
                    <SummaryItemPrice>{order.taxPrice} TND</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem type="total">
                    <SummaryItemText>TOTAL TTC</SummaryItemText>
                    <SummaryItemPrice>{order.totalPrice} TND</SummaryItemPrice>
                    {error && (
                <Message variant="alert-danger">{error}</Message>)}
                  </SummaryItem>
                </Summary>
              </Bottom>
              </>)}
            </Wrapper>
            <Footer />
            <Footer2 />
          </Container>
  );
};

export default OrderPay;
