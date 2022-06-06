import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { login , sociallogin } from "../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "../components/SocialButton";
import FacebookButton from "../components/FacebookButton";
import { DialogTitle } from "@mui/material";
import styled from "styled-components"
import Loading from "../components/Loading";


const Container = styled.div`

`;


const Alert = styled.div`
font-size: 15px ;
color: red ;
padding-top: 3px ;
padding-bottom: 15px ;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center ;
`;

const Input = styled.input`
  flex: 1;
	white-space: nowrap;
	text-align: left;
	font-family: Gill Sans Nova;
	font-style: normal;
	font-weight: normal;
	font-size: 25px;
  min-width: 40%;
  margin: 10px 0;
  padding: 20px ;
  border : 1px solid gray;
  border-radius: 5px;

`;

const ButtonLogin= styled.button`
 flex: 1;
	white-space: nowrap;
	text-align: left;
	font-family: Gill Sans Nova;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
  padding: 18px ;
  color:white ;
  background-color: #004B80;
  border : 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom:5px ;
`;



const Linkk = styled.a`
  margin: 15px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color:#24446D ;
`;

const FP= styled.p`
 text-align: left;
 
 `;






export default function LoginButton() {

  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('xs');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();
  const dispatch = useDispatch();


  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  
const handleSocialLogin = (user) => {

  dispatch(sociallogin(user._profile.firstName, user._profile.lastName,user._profile.email,user._profile.profilePicURL));
  console.log(user)


  
};

const handleSocialLoginFailure = (err) => {
  
  console.error(err);
};





  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Container>
      
        <FacebookButton
provider="facebook"
appId="288632980115677"
onLoginSuccess={handleSocialLogin}
onLoginFailure={handleSocialLoginFailure}
>
 Facebook
</FacebookButton>  

<GoogleButton
      provider="google"
      appId="885800747205-b301a9618mgc7enshib4fdsp86mgfk49.apps.googleusercontent.com"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >Google 
    </GoogleButton>
<hr></hr>
<Form onSubmit={submitHandler}>
  
  <Input 	
          placeholder="Adresse E-mail
          "
             type="email"
		    required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        
        />

          <Input type="password"
							placeholder="Mot de passe"
							name="password"
							required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
  
              />
              <Link to="/password/forgot">Mot de passe oublié ?</Link>
                {loading && <Loading/>}

							<Alert > {error} </Alert>
              
          <ButtonLogin type="submit" disabled={loading}>LOGIN</ButtonLogin>


       <Link to="/signup">   <Linkk>Vous n'avez pas de compte ? S'inscrire</Linkk></Link>
          </Form>

</Container>
   
      </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}