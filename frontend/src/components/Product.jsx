import styled from "styled-components";
import Rating from '@mui/material/Rating';
const Wrapper = styled.div`
display:flex ;
  width: 270px;
  height: 345px;
  background-color: rgba(255,255,255,1);
  border-radius: 3px;
  box-shadow: 3px 3px #E2E0E0, -1px 0 .4em #E2E0E0; 
  margin-right:10px ;
margin-bottom:10px ;
:hover{
  box-shadow: 6px 6px #E2E0E0, -1px 0 .4em #E2E0E0; 
}
cursor: pointer;

`;



const Image = styled.img`
top: 100% ;
width:260px ;
height: 181px;

`;


const Info = styled.div`
display: flex;
justify-content: center;
flex-direction:column ;
font-size:16px ;
margin-left:10px ;
`;

const Title = styled.h1`
text-align:left ;
font-size: 19px ;
margin-left:5px ;
`;

const Rivew = styled.div`
margin-left:6px ;
display: flex ;
align-items:center ;
`;

const Prix = styled.h3`
text-align:left ;
margin-left:10px ;
`;

const Numrev = styled.h1`
font-weight: normal ;
font-size:13px ;
margin-left:3px ;
color:#8F8D8D ;
`;


const Product = (props) => {
  return (
    <>
    
    <Wrapper>

    
         <Info>
<div>
        <Image src={props.image[0]}>
</Image>
</div>
<Title>{props.name}</Title>
<Rivew>
<Rating name="half-rating-read" defaultValue={props.rating} precision={0.5} readOnly size="small" />  <Numrev>({props.numReviews})</Numrev>
</Rivew>
<Prix>
 {props.price} TND
</Prix>
        </Info>

      </Wrapper>

    
</>
  );
};

export default Product;
