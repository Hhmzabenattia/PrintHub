import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { useState , useEffect} from "react";
import axios from 'axios';



const Span = styled.span`

color: black;
    font-size: 21px;
    font-weight: 700;
    font-family:Lato ;
    margin-left: 100px;
  
`;

const Container = styled.div`

  margin:30px ;
  justify-content: center;
`;

const Image = styled.img`
margin-left :80px ;
width:270px ;
height: 270px;
object-fit:cover ;


`;
const Title = styled.h1`
text-align:center ;
font-size: 18px ;
margin-left:70px ;
`;






 function Categoryslide () {
  
    const [categoryList, setcategoryList] = useState([]);

    useEffect(()=>{
          axios.get("http://localhost:1000/api/category/").then((response)=>{
            setcategoryList(response.data.cat);
          });
    },[]);
  



    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
        <>
        <Span> Découvrez d'autres catégories </Span>
 
  <Container>
        <Slider {...settings}>
          {categoryList.map((cat) => (
            <div key={cat._id}>
      <Link style={{ textDecoration: 'none' , color: 'black' }} to={`/products/category/${cat.name}`}>  
       
       <Image src={cat.image}/>
            <Title>{cat.name}</Title>
        </Link>
        </div>
        ))}
         
        </Slider>
        </Container>
     </>
    );

}
export default Categoryslide;