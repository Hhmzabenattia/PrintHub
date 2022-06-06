import styled from "styled-components";
import { login , sociallogin } from "../Redux/Actions/userActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/SocialButton";
import FacebookButton from "../components/FacebookButton";
import MetaData from "../components/MetaData";





const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

`;

const Right = styled.div`
  flex:1 ;
`;

const Left = styled.div`
overflow: hidden ;
`;

const Alert = styled.div`
font-size: 15px ;
color: red ;
padding-top: 3px ;
padding-bottom: 15px ;

`;

const Title = styled.h1`
	overflow: visible;
	white-space: nowrap;
	text-align: left;
	font-family: Lato;
	font-style: normal;
	font-weight: normal;
	font-size: 40px;
	color: rgba(0,0,0,1);
`;

const STitle = styled.p`
	overflow: visible;
	white-space: nowrap;
	text-align: left;
	font-family: Lato;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	color: rgba(147,147,147,1);`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center ;
`;

const Social = styled.form`
  display: flex;
  align-items: center ;
`;



const Input = styled.input`
  flex: 1;
	white-space: nowrap;
	text-align: left;
	font-family: Lato;
	font-style: normal;
	font-weight: normal;
	font-size: 27px;
  min-width: 40%;
  margin: 20px 0;
  padding: 20px ;
  border-color: #46A9E0;
  border-radius: 10px;
`;

const Button = styled.button`
  background: #24446D;
  border-radius: 999px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 20px 60px;
  width: fit-content;
  word-break: break-word;
  box-shadow: 8px 8px 2px 1px #E2E0E0;
  
  border: 0;
`;

const Linkk = styled.a`
  margin: 15px 0px;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
  color:#24446D ;
`;

const Img = styled.img`
position: relative ;
right: 6% ;
box-shadow: 10px 10px 2px 1px #E2E0E0;
height: 100vh;
width: 100vh;
border-top-right-radius: 43% ;
border-bottom-right-radius: 43%;


`;

const NEWUSER = styled.div`
flex:1 ;
left: 81%;
top: 43px;
position: absolute;
overflow: visible;
width: 100px;
white-space: nowrap;
text-align: left;
font-family: Lato;
font-style: normal;
font-weight: normal;
font-size: 22px;
color: rgba(95,95,95,1);`; 

const A = styled.a`

    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    color: rgba(36,68,109,1);
    cursor: pointer;
`;
	


const Login = () => {

  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();
  const dispatch = useDispatch();


  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo)
    {
      navigate(-1);
    }
  }, [userInfo]);

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
    <>
      <MetaData title="Login" />

    <Container>
      <Left>
      <Img src='https://res.cloudinary.com/durmvqkw9/image/upload/v1647259825/image_loiora.png' alt=''/>
      </Left>
      
      <Right>
      <NEWUSER>
      Pas de compte ? <A href="/signup">Créez-en un?</A>
        </NEWUSER>
    
  
      
        <Form onSubmit={submitHandler}>
        <Title>BIENVENUE</Title>
        <STitle>Connectez-vous pour continuer</STitle>
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
                {loading && <Loading/>}

							<Alert > {error} </Alert>
              
          <Button type="submit">Connexion</Button>


          <Linkk href="/password/forgot">Mot de passe oublié ??</Linkk>
          <Social>


    
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
    >
       Google
    </GoogleButton>


</Social>
        </Form>



      </Right>
    </Container>
    </>
  );
};

export default Login;
