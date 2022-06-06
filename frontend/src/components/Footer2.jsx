import React from 'react'
import styled from 'styled-components';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Container = styled.div`
  background-color: #F9F9F9;
  display:flex ;
  height:50px ;
  overflow: hidden;

`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content:flex-start ;
  align-items:center;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
`;



const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center ;


`;





const SocialIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: white;
  display: flex;
  background-color: #${(props) => props.color};
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;



const Item = styled.div`
background-color: white  ;
border-radius: 5px ;
align-items: center;
display: flex ;
font-size: 12px ;
margin-right:10% ;
box-shadow: 5px 5px 10px  #E2E0E0;
width: fit-content;


`;

const P = styled.p`
font-family:Lato ;
font-size: 16px ;
margin-left:10px ;
margin-right:10px ;

`;

function Footer2() {
  return (
    <Container>
        <Left>
        Copyright © 2022 PRINTHUB.
        </Left>

        <Center>
        
            <Item>
                <PhoneIcon/>
                     <P>+216 55 214 336</P>
            </Item>

            <Item>
                <EmailOutlinedIcon/>
                     <P>Printhub@Gmail.com</P>
            </Item>

        </Center>

        <Right>
            <P>Follow us </P>
        <SocialIcon color='435EA3'>  
            <FacebookTwoToneIcon />
        </SocialIcon>

        <SocialIcon color='B724C7'>

        <InstagramIcon />
        </SocialIcon>
    
                </Right>
     
        
        </Container>
  )
}

export default Footer2