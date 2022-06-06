import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Footer2 from "./../components/Footer2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removefromcart, addToCart } from "./../Redux/Actions/cartActions";
import styled from "styled-components";
import MetaData from "../components/MetaData";

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f2f2f2;
`;
const Container = styled.div``;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
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
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-weight: bold;
`;

const ProductCaract = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: white;
  border: none;
  height: 1px;
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

const Close = styled.div`
  position: absolute;
  right: 70vh;
  border-radius: 50%;
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

const Input = styled.input`
  width: 80px;
  height: 20px;
  border-radius: 5px;
  text-align: center;
`;

const Cart = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);


 // Calculate Price
 const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

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




  const checkOutHandler = () => {
    navigate("/shipping");
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };
  return (
    <>  
    <MetaData title="Panier " />

      {cartItems.length > 0 ? (
        <>
          <Container>
            <Header />
            <Title>Votre Panier </Title>
            <Top>
              <Link to="/products">
                {" "}
                <TopButton>Continuer mes achats</TopButton>
              </Link>
              <TopButton onClick={checkOutHandler} type="filled" style={{"backgroundColor":  "#2b8bf9"}}>
                Commander
              </TopButton>
            </Top>
            <Wrapper>
              <Bottom>
                <Info>
                  {cartItems.map((item) => (
                    <>
                      <Product>
                        <Close
                          onClick={() => removeFromCartHandle(item.product)}
                        >
                          <CloseIcon color="primary" />
                        </Close>
                        <ProductDetail>
                          <Link to={`/product/${item.product}`}>
                            <Image src={item.image} />
                          </Link>
                          <Details>
                            <Link
                              style={{ textDecoration: "none", color: "black" }}
                              to={`/product/${item.product}`}
                            >
                              <ProductName>{item.name}</ProductName>
                            </Link>
                            {item.caract.map((c) => (
                              <ProductCaract>{c}</ProductCaract>
                            ))}
                            <ProductCaract>Votre fichier: <a href={item.attachment} target="_blank" rel="noreferrer">Télécharger</a></ProductCaract>
                            

                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <ProductAmountContainer>
                            {item.qty > item.quantity ? (
                              <button
                                onClick={(e) =>
                                  dispatch(
                                    addToCart(
                                      item.product,
                                      Number(item.qty) - 1,
                                      item.caract
                                    )
                                  )
                                }
                              >
                                -
                              </button>
                            ) : (
                              <></>
                            )}
                            <Input
                              type="number"
                              min={item.quantity}
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value),
                                    item.caract
                                  )
                                )
                              }
                            />
                            <button
                              onClick={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(item.qty) + 1,
                                    item.caract
                                  )
                                )
                              }
                            >
                              +
                            </button>
                          </ProductAmountContainer>
                          <ProductPrice>
                            {(item.price * item.qty).toFixed(2)} TND
                          </ProductPrice>
                        </PriceDetail>
                      </Product>
                      <Hr />
                    </>
                  ))}
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

export default Cart;