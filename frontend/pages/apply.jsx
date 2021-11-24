import { Typography, Container, Divider } from '@mui/material';
import PageTitle from '@components/PageTitle';

const Apply = () => {
  return (
    <>
        <Container maxWidth="760px" sx={{ maxWidth: '760px', mx: 'auto' }}>
            <PageTitle 
                title="Apply for IDO"
                subtitle="Fill out the form below to apply to launch your IDO on ErgoPad"
            />
            
            <Typography variant="p">
                This section coming soon. 
            </Typography>

        </Container>
    </>
  );
};

export default Apply;