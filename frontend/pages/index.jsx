import Features from '@components/Features';
import Hero from '@components/Hero';
import { Container } from '@mui/material';

const Homepage = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Hero
          title='Welcome to ErgoPad'
          subtitle='We are a token launch platform for Ergo giving you an opportunity to get in on the ground floor with Ergo token IDOs. We help projects navigate Ergoscript to build safe apps for you to invest in.'
        />

        <Features />
      </Container>
    </>
  );
};
/* 
<style jsx global>{`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Inter, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`}</style> */

export default Homepage;
