import { Typography, Container } from '@mui/material';
import PageTitle from '@components/PageTitle';

const Staking = () => {
  return (
    <>
        <Container maxWidth="760px" sx={{ maxWidth: '760px', mx: 'auto' }}>
            <PageTitle 
                title="Stake your ErgoPad Tokens"
                subtitle="Connect your wallet and stake your tokens to receive staking rewards and opportunities to get into other project launches early."
            />
            
            <Typography variant="p">
                More info coming very soon!
            </Typography>

        </Container>
    </>
  );
};

export default Staking;