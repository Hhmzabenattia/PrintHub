import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import Footer2 from "../../components/Footer2";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import {Helmet} from "react-helmet";
import { getUserDetails } from "../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Redux/Actions/userActions";
import Toast from "../../components/LoadingError/Toast";
import { Avatar } from "@mui/material";
import axios from "axios";
import MetaData from "../../components/MetaData";



const Label = styled.label`
margin-left:40px ;
`

const H3 = styled.h3`
align-items:center ;
justify-content:center ;
text-align:center ;
margin:30px ;

`;




function Profile() {

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo ,  } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;



  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [tva, setTva] = useState("");
  const [socite, setSocite] = useState("");
  const [adresse, setAdresse] = useState({
    adr: userInfo.user.adresse?.adr,
    ville: userInfo.user.adresse?.ville,
    zipecode:userInfo.user.adresse?.zipecode,
  });



  const [avatarPreview, setAvatarPreview] = useState(userInfo.user.avatar);

  const toastId = React.useRef(null);



  useEffect(() => {
    dispatch(getUserDetails("profile"));
    
  }, [dispatch],userInfo);


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

  const handleAdresseChange = (e) => {
    setAdresse({ ...adresse, [e.target.name]: e.target.value });
  };


  const submitHandler =  (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, fname,lname ,email, password,phonenum, avatar,socite,tva,adresse }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
    }
  };

  return (
    <>
     <MetaData title="Mon Compt" />

    <Header/>
    <H3>Vos informations personnelles</H3>
    <div className="container">
    <Helmet>
                <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
                

            </Helmet>
<div className="row gutters mb-5">
<div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div className="card">
	<div className="card-body">
		<div className="account-settings">
			<div className="user-profile">
				<div className="user-avatar">
				<Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 222, height: 222 }}
                                    />
				
				</div>
				<Label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                        />
                                    </Label>
			
			</div>
     

		</div>
	</div>
</div>
</div>
{error && <>{error}</>}
<div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div className="card h-100">
	<div className="card-body">
		<div className="row gutters">
			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="nom">Nom</label>
					<input type="text" className="form-control" id="nom" defaultValue={userInfo.user.fname}  onChange={(e) => setFname(e.target.value)} placeholder="Enter votre nom"/>
				</div>
			</div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="prénom">Prénom</label>
					<input type="text" className="form-control" id="prénom" defaultValue={userInfo.user.lname} onChange={(e) => setLname(e.target.value)} placeholder="Enter votre prénom"/>
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="eMail">Email</label>
					<input type="email" className="form-control" id="eMail" defaultValue={userInfo.user.email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter votre email"/>
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="phone">Num Tél</label>
					<input type="text" className="form-control" id="phone" defaultValue={userInfo.user.phonenum}  onChange={(e) => setPhonenum(e.target.value)} placeholder="Enter votre numéro de télphone"/>
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="mdp">Nouveau mot de passe</label>
					<input type="password" className="form-control" id="mdp" onChange={(e) => setPassword(e.target.value)} placeholder="votre mot de passe"/>
				</div>
			</div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="mdp2">Confirme mot de passe</label>
					<input type="password" className="form-control" id="mdp2" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirmer votre mot de passe"/>
				</div>
			</div>

      {userInfo.user.role ==="Imprimerie" &&
                    <>
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Imprimerie:</label>
                      <input className="form-control" type="text" defaultValue={userInfo.user.socite} onChange={(e) => setSocite(e.target.value)}/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">TVA:</label>
                      <input className="form-control" type="text" defaultValue={userInfo.user.tva} onChange={(e) => setTva(e.target.value)}  />
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Adresse:</label>
                      <input className="form-control" type="text" name="adr" defaultValue={userInfo.user.adresse?.adr}  onChange={handleAdresseChange}/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Ville:</label>
                      <input className="form-control" type="text" name="ville" defaultValue={userInfo.user.adresse?.ville}  onChange={handleAdresseChange}/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Code Postal:</label>
                      <input className="form-control" type="text"  name="zipecode" defaultValue={userInfo.user.adresse?.zipecode}  onChange={handleAdresseChange}/>
                    </div> 
                    
                    </>}



		</div>
	
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="text-right">
				<Toast/>  
        {updateLoading && <Loading />}

					<button type="button" id="submit" name="submit" onClick={submitHandler} class="btn btn-primary">Update</button>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</div>
</div>
    
<div>
<Footer/>
    <Footer2/>
</div>
    </>
    
  )
}

export default Profile