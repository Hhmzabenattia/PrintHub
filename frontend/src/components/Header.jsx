import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import { useState , useEffect} from "react";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import "./header.css";
import React from "react";
import styled from "styled-components";
import { Link, Navigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import SearchBar from './SearchBar';
import { listProduct } from "../Redux/Actions/ProductActions";

const Container = styled.div`
position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  transition: all 0.4s ease;
  background-color: #fff;
  z-index: 5 ;
  object-fit: cover;

 
  
`;

const Wrapper = styled.div`
   width: 98%;
  height: 80px;
  display: flex;
  margin-right:100px ;
  

`;

const Left = styled.div`
  flex: 30%;
  display: flex;
  
`;

const Button = styled.button`
background: #004B80;
  border-radius: 5px;
  border-color: #004B80 ;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  opacity: 1;
  white-space: nowrap;
  outline: 0 solid transparent;
  padding: 8px;
  width: fit-content;
  max-width: 110px ;
  word-break: break-word;
  font-size:15px ;

`;

const Center = styled.div`
  flex: 30%;
  display: flex;
`;

const Logo = styled.img`
width:150px ;
height:70px ;
`;
const Right = styled.div`
  flex: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  font-family: Lato ;
  font-weight: bold ;
  margin: 10px;
  &:hover {
    color: #4070f4;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload(false);

  };



  return (

    <Container>
      <Wrapper>
      <Left>
        <Link to="/"><Logo src="https://res.cloudinary.com/durmvqkw9/image/upload/v1653511299/log_rxuokl.png"/></Link>
        </Left>
        <Center>
        <SearchBar/>
        </Center>
    
        <Right>
            <Link to="/" style={{ textDecoration: 'none' , color: 'black' }}>
          <MenuItem>
       Home
        </MenuItem>
            </Link>
 <Link to="/myorder" style={{ textDecoration: 'none' , color: 'black' }}>
<MenuItem>
Commandes
</MenuItem>
</Link>
<Link to="/products" style={{ textDecoration: 'none' , color: 'black' }}>
<MenuItem>
Produits
</MenuItem>
</Link>
<Link to="/about" style={{ textDecoration: 'none' , color: 'black' }}>
<MenuItem>
A Propos
</MenuItem>
</Link>
<Link to="/cart">
          <div style={{margin: "10px"}}>
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </div>
          </Link>
     
        <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                 <div className="dropdown">
                 <Button className="dropbtnn">Hi {userInfo.user.fname}</Button>
                 <div className="dropdown-content">
                 <Link to="/profile" >Profile</Link>
                 <Link to="/myorder" >Commandes</Link>
                 <div class="dropdown-divider"></div>
                   <Link to="#"
                       onClick={logoutHandler}>
                         Logout</Link>
                 </div>
               </div>
                ) : (
                  <>
                      <div style={{margin: "10px"}}>
                    <LoginButton>Login</LoginButton>

        </div>

        

                  </>
                )}
                </div>



        </Right>
      </Wrapper>

    </Container>
  );
};

export default Header;
