import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useState , useEffect} from "react";
import styled from "styled-components";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';



const Image = styled.img`
  height: 400px;
  width: 100% ;
  
`;



const Slider = () => {


  
  const [slideList, setSlideList] = useState([]);

  useEffect(()=>{
        axios.get("http://localhost:1000/api/slide").then((response)=>{
          setSlideList(response.data.slide);

        });
  },[])

  return (

<Carousel autoplay>
{slideList.map((slide) => (
    <div key={slide._id}>
      <Link to={slide.url}>
              <Image src={slide.image} />
      </Link>
    </div>
)) }
  </Carousel>







  );
};

export default Slider;
