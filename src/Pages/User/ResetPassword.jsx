import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer'
import Footer2 from '../../components/Footer2'
import Header from '../../components/Header'
import Loading from '../../components/Loading';
import { resetPassword } from '../../Redux/Actions/userActions';
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
justify-content: space-around;
`

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



function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();



  const { error, success, loading } = useSelector((state) => state.forgotPassword);
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setErr("Password length must be atleast 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setErr("Password Doesn't Match");
      return;
    }
    dispatch(resetPassword(params.token, password));
  }

  useEffect(() => {
    if (userInfo)
    {
      navigate("/");
    }

    if (success) {
      navigate("/login")
    }
  }, [dispatch, error, success, navigate]);


  return (
  
    <>
                <MetaData title="Reset Password" />

    <Header/>
    <Container>
      
    {loading && <Loading />}
    <Stack sx={{ width: '30em' }} spacing={2}>
{error &&  <Alert severity="error">{error}</Alert> }    
    </Stack>
    <form onSubmit={handleSubmit}>
<div class="flex flex-col w-full gap-4">

  <TextField
    fullWidth
    label="New Password"
    type="password"
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <TextField

    fullWidth
    label="Confirm New Password"
    type="password"
    name="confirmPassword"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />

  {err && <Alert severity="warning">{err}</Alert>}


    <Button type="submit" >Submit</Button>

</div>
</form>


</Container>
    <Footer/>
    <Footer2/>




    </>
  )
}

export default ResetPassword