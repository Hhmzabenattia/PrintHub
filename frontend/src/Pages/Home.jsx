import React from 'react'
import Footer from '../components/Footer'
import Footer2 from '../components/Footer2'
import Newsletter from '../components/Home/Newsletter'
import Slideshow from '../components/Home/Slideshow'
import F from '../components/Home/F'
import ProductSlide from '../components/Home/ProductSlide'
import Categoryslide from '../components/Home/Categoryslide'
import Header from '../components/Header'
import About from '../components/Home/About'
import OurDisigner from '../components/Home/OurDisigner'
import styled from 'styled-components'
import MetaData from '../components/MetaData'
import Navbar from './Test'

const DIV = styled.div`
display:flex;
flex-direction:column ;

`



function Home() {
  window.scrollTo(0, 0);
  return (
    <DIV>
                  <MetaData title="PrintHub" />

      <Header/>
      <Slideshow/>
      <F/>
      <ProductSlide/>
      <Categoryslide/>
      <About/>
      <Newsletter/>

<Footer/>
<Footer2/>
    </DIV>
  )
}

export default Home