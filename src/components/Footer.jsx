import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items:center ;
  flex-wrap: wrap;
left:0;
bottom:0;
right:0;


`;

const Left = styled.div`
 
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
padding-left: 70px ;
padding-right: 90px ;
width:150px ;
height:70px ;

`;



const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column ;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-size:14px ;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;

`;


const Footer = () => {
  return (
    <Container>
      <Left>
      <Logo src="https://res.cloudinary.com/durmvqkw9/image/upload/v1653511299/log_rxuokl.png"/>
      </Left>
      <Center>
        <Title>PRODUITS</Title>
        <List>
        <Link to="/products/category/Numérique" style={{ textDecoration: 'none' , color: 'black' }}>
          <ListItem>Numérique</ListItem>
          </Link>
          <Link to="/products/category/Bureautique" style={{ textDecoration: 'none' , color: 'black' }}>
          <ListItem>Bureautique</ListItem>
          </Link>
          <ListItem>Numérique & Offset</ListItem>
        </List>
      </Center>
      <Right>
        <Title>NOTRE SOCIÉTÉ</Title>
        <List>
        <Link to="/livraison" style={{ textDecoration: 'none' , color: 'black' }}>
          <ListItem>Livraison</ListItem>
          </Link>
          <ListItem>Mentions légales</ListItem>
          <Link to="/about" style={{ textDecoration: 'none' , color: 'black' }}>
          <ListItem>A propos</ListItem>
          </Link>
        </List>
      </Right>
      <Right>
        <Title>ACCOUNT</Title>
        <List>
        <Link to="/profile" style={{ textDecoration: 'none' , color: 'black' }}>
          <ListItem>Informations personnelles</ListItem>
          </Link>
          <Link to="/myorder" style={{ textDecoration: 'none' , color: 'black' }}>
          <ListItem>Commandes</ListItem>
          </Link>
          <ListItem>Adresses</ListItem>
        </List>
      </Right>
    </Container>
  );
};

export default Footer;
