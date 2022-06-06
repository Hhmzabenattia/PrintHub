import styled from "styled-components";

const Wrapper = styled.div`
 flex:1 ;
 background-color: rgba(255,255,255,1);
  border-radius: 5px;
  box-shadow: 3px 3px #E2E0E0, -1px 0 .4em #E2E0E0; 
  margin:30px ;
  text-align:center;
  flex-direction:column ;
  justify-content:space-around ;
  min-width:45vh ;
  flex-wrap: wrap;


`;

const Container = styled.div`
  margin: 5px;
  display: flex;
  position: relative;
  flex-wrap: wrap;

`;

const Title = styled.h1`
font-family:Lato ;
text-align:center ;
`;

const Image = styled.img`
border-radius:50% ;
width:120px ;
height:120px ;
margin-top: 10px ;
box-shadow: 10px 5px 20px #A7A5A5;`;

const Text = styled.h1`
font-family: Lato ;
text-align:left ;
font-weight:normal ;
font-size:18px ;
padding:0px 50px;



`;

const Name = styled.h3`
color:black ;
`;

const Jobe = styled.h4`
color:#2B8BF9 ;
`;


const OurDisigner = () => {
  return (
      <><Title> OUR DESGINEURS</Title>
  
    <Container>

     <Wrapper>
        <Image src="https://res.cloudinary.com/durmvqkw9/image/upload/v1647869069/Oval_Copy_qn9j35.png"/>    
        <Text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic placeat repellat, velit ad aut ratione deserunt fuga eius deleniti veritatis, mollitia expedita ea nisi laborum modi minima! Itaque, quos ipsam.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic placeat repellat, velit ad aut ratione deserunt fuga eius deleniti veritatis, mollitia expedita ea nisi laborum modi minima! Itaque, quos ipsam.

        </Text>
           <Name>Asma Traidi</Name>
           <Jobe>Desgineur</Jobe>

 </Wrapper>

 <Wrapper>
        <Image src="https://res.cloudinary.com/durmvqkw9/image/upload/v1647871126/Oval_Copy_gq_gaxcnd.png"/>    
        <Text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic placeat repellat, velit ad aut ratione deserunt fuga eius deleniti veritatis, mollitia expedita ea nisi laborum modi minima! Itaque, quos ipsam.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic placeat repellat, velit ad aut ratione deserunt fuga eius deleniti veritatis, mollitia expedita ea nisi laborum modi minima! Itaque, quos ipsam.

        </Text>
           <Name>Asma Traidi</Name>
           <Jobe>Desgineur</Jobe>

 </Wrapper>
 <Wrapper>
        <Image src="https://res.cloudinary.com/durmvqkw9/image/upload/v1647869069/Oval_Copy_qn9j35.png"/>    
        <Text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic placeat repellat, velit ad aut ratione deserunt fuga eius deleniti veritatis, mollitia expedita ea nisi laborum modi minima! Itaque, quos ipsam.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic placeat repellat, velit ad aut ratione deserunt fuga eius deleniti veritatis, mollitia expedita ea nisi laborum modi minima! Itaque, quos ipsam.

        </Text>
           <Name>Asma Traidi</Name>
           <Jobe>Desgineur</Jobe>

 </Wrapper>
  </Container>
  </>
  );
};

export default OurDisigner;
