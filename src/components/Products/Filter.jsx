import React from 'react'
import styled from 'styled-components'
import { useState , useEffect} from "react";
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex:1 ;
  flex-direction:column ;
   
`;

const Box = styled.div`

width: 230px ;
height:400px ;
border-radius:3px ;
box-shadow: 5px 0 1px -5px #333;
`;

const Title = styled.h3`
border-radius:2px ;
background-color: #DEDEDF ;
width:100% ;
padding: 10px 0 ;
text-align:center ;
`;

const Catinput = styled.div`
padding:12px;
:hover{
  background-color: #0B93E2;
}
`;


const Lable = styled.label`
cursor: pointer;
`;




function Filter() {


  const [categoryList, setcategoryList] = useState([]);

  useEffect(()=>{
        axios.get("http://localhost:1000/api/category/").then((response)=>{
          setcategoryList(response.data.cat);
        });
  },[]);

 const onCheck= () =>{

 
 }





  return (
    <Container>
<Box>
<Title>Filtre</Title>
{categoryList.map((cat) => (
   <Link style={{ textDecoration: 'none' , color: 'black' }} to={`/products/category/${cat.name}`}>
     <Catinput>
   <Lable>{cat.name}</Lable>
     </Catinput>
     </Link>
     
        ))}
</Box>

    </Container>
  )
}

export default Filter