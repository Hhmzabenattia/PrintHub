import React from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import Footer2 from '../components/Footer2';
import Filter from '../components/Products/Filter';
import Main from '../components/Products/Main';
import { useLocation } from "react-router";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from './Test';
import MetaData from '../components/MetaData';

 


const CatName=styled.div`
margin-top:20px ;
background-color:#F3F3F3 ;
display:flex ;

`;

const Text = styled.p`
margin: 5px;
margin-left : 50px;
line-height: 50px;
`;

const Container = styled.div`
  display: flex;
  padding-bottom:10% ;
`;


function Products() {
  const location = useLocation();

  const cat = location.pathname.split("/")[3];



  return (

    <div>
                        <MetaData title={cat ? `${decodeURI(cat)}` : "Products"}/>

      <Header/>
<CatName>
  <Text><Link to="/" style={{ textDecoration: 'none' , color: 'black' }} >Home</Link> / <Link to="/products" style={{ textDecoration: 'none' , color: 'black' }}>Products</Link> / {cat ?<> {decodeURI(cat)}</> : <></> }</Text>
</CatName>  

<Container>
  <Filter/>
      <Main cat={cat}/>


 </Container> 





<Footer2/>
  </div>
 
  )
}

export default Products