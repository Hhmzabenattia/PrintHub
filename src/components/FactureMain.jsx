import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { getOrderDetails } from '../Redux/Actions/OrderActions';


function FactureMain() {

    const location = useLocation();

    const orderId = location.pathname.split("/")[2];

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
  
    const dispatch = useDispatch();
  
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
  
  
    if (!loading && !error) {
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };
  
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
    }
  
  
  
  
    useEffect(() => {
  
      if (!order) {
        dispatch(getOrderDetails(orderId));
      }
  
    }, [dispatch, orderId, , order]);
  
  
  
  
  



  return (

    <div>
            <Helmet>
                <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
                

            </Helmet>


    {error ? (
               <>   {error}</>
        ) : loading ? (
          <Loading />
        ) :
    <>
                <div class="container" >
                    <div class="brand-section">
                        <div class="row">
                            <div class="col-6">
                                <img src='https://res.cloudinary.com/durmvqkw9/image/upload/v1653511299/log_rxuokl.png' width={"150px"} class="text-white"/>
                            </div>
                            <div class="col-6">
                               
                            </div>
                        </div>
                    </div>
            
                    <div class="body-section">
                        <div class="row">
                            <div class="col-6">
                                <h2 class="heading">Facture n°: {order._id}</h2>
                                <p class="sub-heading">Date Ordre: {moment(order.createdAt).format("DD/MM/YYYY")}</p>
                                <p class="sub-heading">Addresse Email: {userInfo.user.email} </p>
                            </div>
                            <div class="col-5">
                                <p class="sub-heading">Nom et prénom: {order.shippingAddress.fullname}  </p>
                                <p class="sub-heading">Addresse: {order.shippingAddress.address}  </p>
                                <p class="sub-heading"> Num Tél: {userInfo.user.phonenum}   </p>
                                <p class="sub-heading">Pays: {order.shippingAddress.country} ,Ville: {order.shippingAddress.city} ,Code Postal: {order.shippingAddress.postalCode}  </p>
                            </div>
                        </div>
                    </div>
            
                    <div class="body-section">
                        <h3 class="heading">Articles commandés</h3>
                        <br/>
                        <table class="table-bordered">
                            <thead>
                                <tr>
                                    <th>Produit</th>
                                    <th class="w-80">Prix</th>
                                    <th class="w-30">Quantité</th>
                                    <th class="w-30">Prix Total</th>
                                </tr>
                            </thead>
                            <tbody>
        
                            {order.orderItems.map((i) => (
                             
                              <tr>
                                  <td >{i.name}</td>
                                  <td>{i.price} TND</td>
                                  <td>{i.qty}</td>
                                  <td>{(i.qty * i.price).toFixed(2)} TND</td>
                              </tr>
                              
                               ))}
                               
                                <tr>
                                    <td colspan="3" class="text-right">TOTAL (HT)</td>
                                    <td>{(Number(order.itemsPrice) + Number(order.shippingPrice)).toFixed(2)} TND</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="text-right">Total TAXES:</td>
                                    <td>{order.taxPrice} TND</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="text-right">TOTAL TTC</td>
                                    <td>{order.totalPrice} TND</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <h3 class="sub-heading">Statut de paiement: {order.isPaid ? <>Payé</>: <>Impayé</>}</h3>
                        <h3 class="sub-heading">Mode de paiement: {order.paymentMethod}</h3>
                    </div>
            
                    <div class="body-section">
                        <p>&copy; Copyright 2022 - Printhub. All rights reserved. 
                            <a href="https://www.printhub.tn/" class="float-right">www.printhub.tn</a>
                        </p>
                    </div>      
                </div>      
       
    
    </>}
    
    
        </div>
  )
}

export default FactureMain