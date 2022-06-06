import SendIcon from '@mui/icons-material/Send';
import { Alert, AlertTitle, Dialog, DialogActions, DialogContent, DialogContentText, Slide, Stack } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import styled from "styled-components";
import { toast } from "react-toastify";
import Toast from '../LoadingError/Toast';

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center ;
  height:30vh ;
  margin-left:20px ;

`;
const Title = styled.h1`
  font-size: 20px;
  font-family: Lato;

`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 20px;

`;

const InputContainer = styled.div`
  width: 30%;
  height: 40px;
  display: flex;
  border-radius: 10px ;
justify-content  :flex-end ;
padding-left:20px ;

`;

const Input = styled.input`
  flex: 8;
  padding-left: 10px;
`;


const Message = styled.div`
margin-left: 20px;
`


const Button = styled.button`
  flex: 1;
  background-color:#1B7BFA ;
  border: none;
  color: black;
  cursor: pointer;
`;

const Newsletter = () => {
const [message, setmessage] = useState("");


const Toastobjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};


  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:1000/api/news",{email}).then((response)=>{
      setmessage(response.data);
      toast.success(response.data, Toastobjects);
    }).catch((err)=>{
      console.log(err)
    }) ; };





  return (
    <Container>
      	<Toast/>  
        <div>
      <Title>NEWSLETTER</Title>
      
      <Desc>Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela nos informations
        </Desc>
         <Desc>
         de contact dans les conditions d'utilisation du site.</Desc>
      </div>
      {message ? <Message><Alert severity="success">{message}</Alert></Message>

      :
      <InputContainer>
      <Input placeholder="Entrer votre E-mail"    onChange={(e) => setEmail(e.target.value)}/>
      <Button onClick={submitHandler}>
        <SendIcon />
      </Button>
    </InputContainer>
   
      
      }
   
    </Container>

  );
};

export default Newsletter;
