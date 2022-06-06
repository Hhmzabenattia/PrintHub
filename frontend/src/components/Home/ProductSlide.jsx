import React from 'react'
import Product from '../Product'
import styled from "styled-components";
import { useState , useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';



const Container = styled.div`
  display: flex;
  margin:30px ;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-content: center;
`;

const Span = styled.span`
    color: black;
    font-size: 30px;
    font-weight: 500;
    font-family:Lato ;
    margin-left: 50px;
    margin:15px ;
`;




function ProductSlide() {

  const [productList, setProductList] = useState([]);

  useEffect(()=>{
        axios.get("http://localhost:1000/api/products/slide1").then((response)=>{
          setProductList(response.data.products);
        });
  },[]);

const i = productList.length;

  return (
    <>
    <Span>Nos produits les plus populaires</Span>
    <Container>
    { i > 0 ?
    <>
    {productList.map((products) => (
      <Link key={products._id} style={{ textDecoration: 'none' , color: 'black' }} to={`/product/${products._id}`}>  
        <Product image={products.images} name={products.name} price={products.price*products.quantity} rating={products.rating} numReviews={products.numReviews}/> 
        </Link>
        ))}
        </>
        :
        <div>    No Product </div>

    } 
   </Container>
   </>
  )
}

export default ProductSlide