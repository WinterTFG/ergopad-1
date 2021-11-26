import { Typography, Container } from '@mui/material';
import PageTitle from '@components/PageTitle';

const Documentation = () => {
  return (
    <>
        <Container maxWidth="760px" sx={{ maxWidth: '760px', mx: 'auto' }}>
            <PageTitle 
                title="Read the docs"
                subtitle="Everything you need to know about ErgoPad"
            />
            
            <Typography variant="p">
                Coming soon
            </Typography>

        </Container>
    </>
  );
};

export default Documentation;