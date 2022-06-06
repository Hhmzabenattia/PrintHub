import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer';
import Footer2 from '../components/Footer2';
import Header from '../components/Header'
import MetaData from '../components/MetaData';


const H1 = styled.h1`
    text-align: center;
    font-size: 240px;
    line-height: 1;
    margin: 19px 0 10px;
    color: #000;
    font-weight: 700;
`;


const H4= styled.h1`
    
    text-align: center;
`;

function NotFound() {
  return (
    <div>
            <MetaData title="NotFound" />

<Header/>
<section id="main">

  
    <section id="content" class="page-content card card-block">
        
        
<section id="content" class="page-content page-not-found">

      <H1>404</H1>
      <H4>La page que vous cherchez n'a pas été trouvée.</H4>
</section>

      </section>
    
<Footer/>
<Footer2/>
    
  

  </section>


    </div>
  )
}

export default NotFound