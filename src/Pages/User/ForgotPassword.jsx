import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Footer from '../../components/Footer'
import Footer2 from '../../components/Footer2'
import Header from '../../components/Header'
import Loading from '../../components/Loading';
import { forgotPassword } from '../../Redux/Actions/userActions';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MetaData from '../../components/MetaData';


const Container = styled.div`
display: flex;
flex-direction: column ;
align-items:center ;
margin-top:20px ;
margin-bottom:20px ;
min-height:30vh ;
`

const Input = styled.input`
width:25em ;
height:3em ;
`;

const Form = styled.form`
margin: 10px ;
`;

const Button = styled.button`
width:7em ;
height:3em ;
  background-color: black;
  color: white;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const H1 = styled.h1`
font-size:28px ;
font-weight: normal ;
`;

function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const { error, message, loading } = useSelector((state) => state.forgotPassword);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));

        setEmail("");
    }




  return (
    <div>
<Header/>
<MetaData title="Mot de passe oublié" />



<Container>
<H1>
Mot de passe oublié ?
</H1>
<p class="send-renew-password-link">Veuillez renseigner l'adresse e-mail que vous avez utilisée à la création de votre compte. Vous recevrez un lien temporaire pour réinitialiser votre mot de passe.</p>
<Stack sx={{ width: '30em' }} spacing={2}>
{error &&  <Alert severity="error">{error}</Alert> }

{message &&  <Alert severity="success">{message}</Alert>}
    
    </Stack>
  {loading && <Loading/>}

<Form onSubmit={handleSubmit}>
<Input placeholder='Entrer votre Email' value={email} onChange={(e) => setEmail(e.target.value)} required type="email"/>
<Button type="submit" disabled={loading}>Send</Button>
</Form>
</Container>

<Footer/>
<Footer2/>

    </div>
  )
}

export default ForgotPassword