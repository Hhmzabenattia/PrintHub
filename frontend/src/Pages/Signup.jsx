import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { register } from "../Redux/Actions/userActions";
import Loading from "../components/Loading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Avatar, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from '@mui/material';


const Alert = styled.div`
font-size: 15px ;
color: red ;
padding-top: 3px ;

`;


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        PrintHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {


  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [tva, setTva] = useState("");
  const [socite, setSocite] = useState("");
  const [adresse, setAdresse] = useState({
    adr: "",
    ville: "",
    zipecode:"",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");


  const [password, setPassword] = useState("");
  const [phonenum, setPhone] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading,userInfo } = userRegister;

  const [err, setErr] = useState("");

  useEffect(() => {
    if (userInfo) {
      window.location="/";
    }
  }, [userInfo]);


  const submitHandler = (e) => {
    e.preventDefault();
    setErr("")

    if (fname ==="" ||lname ==="" ||email ==="" ||phonenum ==="" ||password ==="") {
      setErr("Veuillez compléter tous les champs");
      loading=false;
    }

else if (role==="Imprimerie" && (tva ===""||socite ==="" || adresse.adr ==="" || adresse.ville ==="" || adresse.zipecode ==="" ))
{
  setErr("Veuillez compléter tous les champs");
      loading=false;
}

    else if (error ==="L'utilisateur existe déjà"){
      setErr("L'utilisateur existe déjà")
    }


    dispatch(register(fname,lname, email,password, phonenum,role,tva,socite,adresse,avatar));
  };

  const handleAdresseChange = (e) => {
    setAdresse({ ...adresse, [e.target.name]: e.target.value });
  };

  const handleDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	}

  



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           <img alt="PrintHub" width={"150px"} height="70px" src='https://res.cloudinary.com/durmvqkw9/image/upload/v1653511299/log_rxuokl.png'/>
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"                  
                  fullWidth
                  label="Prenom"
                  autoFocus
                  required
                  value={fname}
            onChange={(e) => setFname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  autoComplete="family-name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
      
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Addresse Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
      
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Numéro de Tél"
                  value={phonenum}
                  onChange={(e) => setPhone(e.target.value)}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
             
              {role ==="Imprimerie" && <>
               <Grid item xs={12}>
               <TextField
                 required
                 fullWidth
                 label="TVA"
                 value={tva}
                 onChange={(e) => setTva(e.target.value)}
               />
             </Grid>
             <Grid item xs={12}>
             <TextField
               required
               fullWidth
               label="Nom d'Imprimerie"
               value={socite}
               onChange={(e) => setSocite(e.target.value)}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               required
               fullWidth
               label="Adresse"
               name="adr"
               value={adresse.adr}
               onChange={handleAdresseChange}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               required
               fullWidth
               label="Ville"
               name="ville"
               value={adresse.ville}
               onChange={handleAdresseChange}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               required
               fullWidth
               label="Code Postal"
               value={adresse.zipecode}
               name="zipecode"
               onChange={handleAdresseChange}
             />
           </Grid>
           <Grid item xs={12}>
          
           <Input   name="avatar" type="file" onChange={handleDataChange}/>
          
           </Grid>
           <Grid item xs={12}>
           <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 222, height: 222 }}
                                    />
              </Grid>
           </>
             }


             <Grid item xs={12}>
              <FormControl>  
      <FormLabel id="demo-row-radio-buttons-group-label">Je suis un</FormLabel>
      
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" 
                        name="row-radio-buttons-group"
                        defaultValue="User"
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                        >
        <FormControlLabel value="User" control={<Radio />} label="Consommateur" />
        <FormControlLabel value="Imprimerie" control={<Radio />} label="Imprimerie" />
      </RadioGroup>
    </FormControl>
    </Grid>
              
            </Grid>
            {loading && <Loading />}
            <Alert>{err}</Alert>
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                Vous avez déjà un compte? S'identifier
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}