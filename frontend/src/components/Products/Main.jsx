import React from 'react'
import styled from 'styled-components'
import Product from '../Product'
import { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import "./main.css"



const Container = styled.div`
  display: flex;
  flex:4 ;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-content: center;
  margin-top:20px ;
  align-items:center ;
  margin-left:20px ;
`;






function Main(props) {

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, category } = productList;


  useEffect(() => {
    dispatch(listProduct(props.cat));
  }, [dispatch, props.cat]);





  const [pageNumber, setPageNumber] = useState(0);

  const productPerPage = 8;
  const pagesVisited = pageNumber * productPerPage;

  const displayProduct = products
  .slice(pagesVisited, pagesVisited + productPerPage)
    .map((productList) => {
      return (
        <Link style={{ textDecoration: 'none' , color: 'black' }} to={`/product/${productList._id}`}>  
        <Product key={productList._id} image={productList.images} name={productList.name} price={productList.price*productList.quantity} rating={productList.rating} numReviews={productList.numReviews}/> </Link>

      );
    });
    const pageCount = Math.ceil(products.length / productPerPage);

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    
  return (
  
<Container>

{loading ? <Loading/> : error ? (
  <> Sorry  </>
):

<Container>  

{products.length>0 ?
<>
{displayProduct} 
    

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> 
</> : <>No Products</>
}
   </Container>




 
  }
</Container>     
   

  )
}

export default Main