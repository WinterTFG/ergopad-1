import Features from '@components/Features';
import Hero from '@components/Hero';
import { Container, Divider, Box } from '@mui/material';
import RoadMap from '@components/RoadMap';
import CenterTitle from '@components/CenterTitle'
import { useEffect, useState, useRef, createRef } from 'react';
import { useRouter } from 'next/router'

const Homepage = () => {
  
  const router = useRouter()

  let id = router.asPath.match(/#([a-z0-9]+)/gi )

  useEffect(() => {

			if (id) {
				let element = document.querySelector(id);
        console.log(id)
				console.log({ element });

				if (element) {
					element.scrollIntoView({
						behavior: "smooth",
						block: "start",
						inline: "nearest"
					});

				}

			}

	}, [id]);

  return (
    <>
      <Container maxWidth='lg'>
        <Hero
          title='Welcome to ErgoPad'
          subtitle='We are a token launch platform for Ergo giving you an opportunity to get in on the ground floor with Ergo token IDOs. We help projects navigate Ergoscript to build safe apps for you to invest in.'
        />

        <Divider sx={{ mb: 10 }} />

        <Features />


        <Box id="roadmap"></Box>
        <Divider sx={{ mb: 10 }} />

        <CenterTitle
          title="Roadmap"
          subtitle="ErgoPad's tentative launch schedule"
          sx={{ mt: '5rem' }}

        />
        
        <RoadMap />
        
      </Container>
    </>
  );
};

export default Homepage;
