import React from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Header from "../components/Header";
import Footer2 from "../components/Footer2";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Message from "../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import { addToCart } from "./../Redux/Actions/cartActions";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProgressBar from "react-customizable-progressbar";
import MetaData from "../components/MetaData";
import { Alert } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 20px;
`;
const Err = styled.div`
  color: red;
  font-weight: blod;
  margin-left: 80px;
  padding: 10px;
  width: 35vh;
  font-size: 18px;
`;

const P = styled.p`
  font-size: 12px;
  margin-left: 30px;
`;

const FileButton = styled.button`
  border-radius: 25px;
  background-color: #2b8bf9;
  border-color: #2b8bf9;
  border-right: none;
  color: white;
  padding: 16px;
  margin-left: -50px;
  z-index: 5;
  cursor: pointer;
`;

const Label = styled.label`
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 25px;
  padding: 15px;
  padding-right: 30vh;

  border: 1px solid gray;
`;

const CatName = styled.div`
  margin-top: 20px;
  background-color: #f3f3f3;
  display: flex;
`;

const Text = styled.p`
  margin: 5px;
  margin-left: 50px;
  line-height: 50px;
`;

const Left = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Right = styled.div`
  flex: 2;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Title = styled.p`
  font-size: 37px;
  font-family: Lato;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  font-family: Lato;
`;

const Dec = styled.p`
  font-size: 18px;
  font-family: Lato;
  margin-bottom: 50px;
  white-space: pre-wrap;

`;

const Option = styled.option``;

const CaractName = styled.p`
  margin-left: 20px;
  font-size: 21px;
  font-family: Lato;
`;

const Quantity = styled.div`
  display: flex;
`;

const Input = styled.input`
  border-radius: 25px;
  margin-top: 20px;
  width: 20vh;
  font-size: 14px;
  margin-left: 10px;
  height: 5vh;
  cursor: pointer;

  text-align: center;
`;

const Select = styled.select`
  border-radius: 25px;
  width: 60vh;
  height: 8vh;
  margin-left: 20px;
  font-size: 16px;
  cursor: pointer;

  padding-left: 20px;
  background-color: #f6f6f6;
`;

const FileInput = styled.input`
  cursor: pointer;

`;


const Bar = styled.div`
  margin-left: 20vh;
`;



const Button = styled.button`
  border-radius: 10px;
  background-color: #2b8bf9;
  border-color: #2b8bf9;
  display: flex;
  padding: 16px;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 20vh;
  margin-bottom:50px ;
`;

const ReviewDiv = styled.div`
  font-size: 20px;
  padding: 50px;
  width: 50vh;
  background-color: #f2f2f2;
  border-radius: 22px;
`;

const Comment = styled.div`
  display: flex;
  padding: 20px;
`;
const TextArea = styled.textarea`
  padding: 16px;
  margin-left: 3px;
`;

const ButtonRivew = styled.button`
  border-radius: 10px;
  background-color: black;
  border-color: #f2f2f2;
  display: flex;
  padding: 16px;
  color: white;
  margin-top: 10px;
  margin-left: 20vh;
`;

function SinglProduct() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigat = useNavigate();

  const productId = location.pathname.split("/")[2];

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
    

  }, [dispatch, productId, successCreateReview]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [err, setErr] = useState("");
  const [caract, setCaract] = useState([]);
  const [errrEeview, setErrReview] = useState("");
  const [attachment, setattachment] = useState("");

  const AddToCartHandle = (e) => {
    e.preventDefault();
    if (caract.length < product.carac.length) {
      setErr("Veuillez vérifier les champs ");
    } else if (qty < product.quantity) {
      setErr("La quantité minimale est " + product.quantity);
    }else if (attachment === "") {
      setErr("Aucun fichier a éte sélectionnée");
      
    } else {
      dispatch(addToCart(productId, qty, caract, attachment));

      navigat("/cart");
    }
  };

  const [selectedFile, setSelectedFile] = useState("");
  const [perc, setperc] = useState(0);

  const uploadfile = async () => {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let precentage = Math.floor((loaded * 100) / total);
        if (precentage < 101) {
          setperc(precentage);
        }
      },
    };
    const config = {
      onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
    };

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "hvfo976u");
    await axios
      .post(
        "https://api.cloudinary.com/v1_1/durmvqkw9/upload",
        formData,
        options
      )
      .then((response) => {
        setattachment(response.data.secure_url);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );

    if (errorCreateReview) {
      setErrReview(errorCreateReview);
    }
  };


  return (
    <div>
                  <MetaData title={product.name} />

      <Header />
      <CatName>
        <Text>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>/ <Link to="/products" style={{ textDecoration: 'none' , color: 'black' }}>Product</Link> / {error ? <> </> : <>{product.name}</> } 
        </Text>
      </CatName>

      {loading ? (
      <Container>   <Loading /></Container>
      ) : error ? ( navigat("/notfound")) : (
        <Container>
          <Left>
            <Carousel showArrows={false}>
              {product.images?.map((cat) => (
                <div>
                  {" "}
                  <img src={cat} key={cat} />
                </div>
              ))}
            </Carousel>

            {userInfo ? (
              <ReviewDiv>
                <form onSubmit={submitHandler}>
                  Donner un avis:{" "}
                  <Rating
                    name="half-rating"
                    defaultValue={product.rating}
                    precision={0.5}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <Comment>
                    <p>Comment: </p>
                    <TextArea
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></TextArea>
                  </Comment>
                  <ButtonRivew disabled={loadingCreateReview}>
                    SUBMIT
                  </ButtonRivew>
                </form>
                {loadingCreateReview && <Loading />}

                <Err>{errrEeview}</Err>
              </ReviewDiv>
            ) : (
              <ReviewDiv className="my-3">
                <Message variant={"alert-warning"}>
                  Veuillez vous{" "}
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    " <strong>connecter</strong> "
                  </Link>{" "}
                  pour écrire un avis{" "}
                </Message>
              </ReviewDiv>
            )}
          </Left>
          <Right>
            <Title>{product.name}</Title>
            <Rating
              name="half-rating"
              defaultValue={product.rating}
              precision={0.5}
              readOnly
            />{" "}
            ({product.numReviews})
            <Price>{product.price * product.quantity} TND</Price>
            <Dec>{product.description}</Dec>
            {product.carac?.map((i, index) => [
              <CaractName key={i._name}>{i.name}:</CaractName>,

              <Select
                key={i._id}
                onChange={(e) => (caract[index] = e.target.value)}
              >
                <option defaultChecked>Choisir votre option</option>
                {i.value?.map((j) => (
                  <Option key={j.value} value={j}>
                    {j}
                  </Option>
                ))}
              </Select>,
            ])}
            <Quantity>
              <CaractName>
                Quantity:
                <Input
                  type="number"
                  min={product.quantity}
                  required
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </CaractName>
            </Quantity>
            <div>
              <Label htmlFor="upload">
                {selectedFile ? (
                  <> {selectedFile.name} </>
                ) : (
                  <>Choisir un Fichier</>
                )}

                <FileInput
                  type="file"
                  id="upload"
                  hidden
                  accept=".pdf,.ai,.eps,.jpg,.jpeg,.png,.tiff"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </Label>

              <FileButton onClick={uploadfile}>Charger</FileButton>
              <P>Extension acceptée: .pdf,.ai,.eps,.jpg,.jpeg,.png,.tiff</P>
              <Bar>
                {perc <100 && <>
                {perc > 0 && (
                  <ProgressBar
                    radius={15}
                    progress={perc}
                    rotate={NaN}
                    strokeWidth={10}
                    strokeColor="#20b540"
                    strokeLinecap="butt"
                    trackStrokeWidth={10}
                  />
                  
                )}
                </>
                  }

              </Bar>
            </div>
            <Err>{err &&<Alert severity="error">{err}</Alert>}</Err>
            <Button type="submit" onClick={AddToCartHandle}>
              Ajouter au panier
            </Button>
          </Right>
        </Container>
      )}

      <Footer />

      <Footer2 />
    </div>
  );
}

export default SinglProduct;
