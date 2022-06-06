import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Footer2 from '../components/Footer2'
import Header from '../components/Header'
import MetaData from '../components/MetaData'

function About() {
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
  <MetaData title="A Propos " />
  
      <Header />
      <CatName>
<Text><Link to="/" style={{ textDecoration: 'none' , color: 'black' }} >Home</Link> / <Link to="/about" style={{ textDecoration: 'none' , color: 'black' }}>A Propos</Link> </Text>
</CatName>  
<Container>
<h4>A Propos</h4>


</Container>
      <Footer/>
      <Footer2/>
    </div>
  )
}




export default About