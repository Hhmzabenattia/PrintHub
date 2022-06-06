import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Footer2 from "../../components/Footer2";
import Header from "../../components/Header";
import moment from "moment";
import { getUserDetails } from "../../Redux/Actions/userActions";
import { listMyOrders } from "../../Redux/Actions/OrderActions";
import Loading from "../../components/Loading";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import "./wgl.css"
import MetaData from "../../components/MetaData";
import ReactPaginate from "react-paginate";



const Container = styled.div`
display: flex;
flex-direction: column ;
align-items:center ;
margin-top:20px ;
margin-bottom:20px ;
min-height:50vh ;
`

const Empty = styled.div`
    background-color:#F9F9F9;
    border-color: #ff9a52;
    color: #232323;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0;
    font-size: .9125rem;
`;


function MyOrder() {

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;



  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [OrderPerPage, setOrderPerPage] = useState(8);

  const pagesVisited = pageNumber * OrderPerPage;


    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

//


  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (

    <>
            <MetaData title="Mes commandes" />

      <Header />
      <Container>
      <h2> Historique de vos commandes </h2>

      {loading ? (
        <Loading />
        ) : error ? (
          <div variant="alert-danger">{error}</div>
        ) : (
          <>
            {orders.length > 0 ? (
         <div  className="widgetLg">
       
     <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">ID</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Total Prix</th>
          <th className="widgetLgTh">Methode de Paiment</th>
          <th className="widgetLgTh">Statu de paiment</th>
          <th className="widgetLgTh">Statu de Livraison</th>
          <th className="widgetLgTh">Facture</th>




        </tr>
        {orders.slice(pagesVisited, pagesVisited + OrderPerPage).map((order) => (        
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">{order._id}</span>
          </td>
          <td className="widgetLgDate">{moment(order.createdAt).calendar()}</td>
          <td className="widgetLgAmount">{order.totalPrice}TND</td>
          <td className="widgetLgAmount">{order.paymentMethod}</td>

          <td className="widgetLgStatus"> {order.isPaid ? <Button type="Approved"/> :<> <a  href={`../order/pay/${order._id}`} ><Button type="Declined (Click to pay)"/> </a> </> }  </td>
          <td className="widgetLgStatus"> { order.isDelivered ? <Button type="Delivered"/> :<Button type="Pending"/>  }</td>
          <td className="widgetLgStatus"> <a  href={`/facture/${order._id}`} ><Button type="Télécharger"/> </a> </td>


        </tr>))}
       
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(orders?.length / OrderPerPage)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> 

    </div>
          
            )
            :
            (
              <Empty>

                          <p>Vous n'avez pas encore passé de commande</p>
            
        
         </Empty>
            )}
            <p>Vous trouverez ici vos commandes passées depuis la création de votre compte</p>

    </>)}
</Container>
      <Footer />
      <Footer2 />
    </>
  );
}

export default MyOrder;
