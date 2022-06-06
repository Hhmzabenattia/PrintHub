import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>S'identifier</div>
      <div className={props.step2 ? 'active' : ''}>Adresse de livraison</div>
      <div className={props.step3 ? 'active' : ''}>Confirmation de commande</div>
      <div className={props.step4 ? 'active' : ''}>Paiment</div>

    </div>
  );
}
