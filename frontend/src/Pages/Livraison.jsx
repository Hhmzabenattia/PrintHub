import { Container } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer'
import Footer2 from '../components/Footer2'
import Header from '../components/Header'

function Livraison() {


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
    
    const Container= styled.div`
        display: flex;
         padding-bottom:10% ;
         margin-left : 50px;

    `
    

  return (
    <div>
        <Header/>
        <CatName>
  <Text><Link to="/" style={{ textDecoration: 'none' , color: 'black' }} >Home</Link> / <Link to="/livraison" style={{ textDecoration: 'none' , color: 'black' }}>livraison</Link> </Text>
</CatName>  
<Container>
<h4>Expéditions et retours</h4>


</Container>
        <footer>
        <Footer/>
        <Footer2/>
        </footer>
    </div>
  )
}

export default Livraison