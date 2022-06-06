import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Container = styled.div`
 background-color: #F9F9F9;
  padding: 0.5rem;
`;

const Title = styled.h1`
font-family:'Roboto' , sans-serif ;
text-align:center ;
`;

const STitle = styled.h2`
margin-left:30px ;

font-family:'Roboto' , sans-serif ;
text-align:left ;
`;

const Desc = styled.h3`
margin-left:30px ;
    line-height: 36px;
    margin-top: -8px;
    text-align: left;
    font-family:'Roboto' , sans-serif ;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
`;




const Wrapper = styled.div`
  padding: 0.5rem;
  display:flex ;
  color:black ;
  margin:50px ;
  height:80% ;
  flex-wrap: wrap;

`;


const Left = styled.div`
background-color: #fff;
  border: 1px solid #fff;
  color: black;
flex:1 ;
`;

const Right = styled.img`
flex:1 ;
flex-wrap: wrap;
width:100% ;
`;

const Button = styled.h2`
background-color: white ;
color:#3282F6 ;
margin-left:30px ;
font-family:'Roboto' , sans-serif ;
font-size:20px ;
border:none ;
cursor: pointer;
margin-bottom:10px ;


`;


function About() {
  return (
    <Container>

      <Title>
 A Propos De Nous
      </Title>
   
<Wrapper>
  <Left>
    <STitle> PRINTHUB </STitle>

<Desc>
Notre projet est là pour tous les graphistes, revendeurs,
communicants, artisans et entrepreneurs en proposant
une plateforme d'impression simple et ouverte aux
connaissances en création d'image de chacun. Ouvert 7
jours sur 7, que vous souhaitiez imprimer depuis tous
monde, nous apporterons vos supports publicitaires
jusqu'à votre porte et vous indiquerons une livraison aux
délais aux délais !
</Desc>
<Link style={{ textDecoration: 'none' , color: 'black' }} to="/about"> <Button>Afficher Plus</Button></Link>
</Left>

<Right src='https://res.cloudinary.com/durmvqkw9/image/upload/v1647865642/Groupe_de_masques_2_zewfdf.png'/>

</Wrapper>



        </Container>
  )
}

export default About