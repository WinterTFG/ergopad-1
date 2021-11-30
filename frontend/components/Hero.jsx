import { Grid, Typography, Button, Box }  from '@mui/material';
import LowerGradients from '@components/stylistic/LowerGradients';
import theme from '../styles/theme';
import Image from 'next/image'

const Hero = ({ title, subtitle }) => {
  return (
    <>
    

    <Box maxWidth='lg' sx={{ position: 'relative', mx: 'auto', height: '0', pointerEvents: 'none', zIndex: '-100', overflow: 'visible' }} aria-hidden="true">
      <LowerGradients />
    </Box>  

    <Grid container spacing={2} sx={{alignItems: 'center'}}>
      <Grid item xs={12} md={5} sx={{ mt: { xs: 12, md: 6 } }}>
        <Typography variant='h1'>{title}</Typography>
        <Typography
          variant='subtitle1'
        >
          {subtitle}
        </Typography>
        <Typography
          variant='subtitle1'
        >
          Follow our announcement channels to receive updates and be the first to invest in the ErgoPad token IDO and new projects:
        </Typography>

        <Box sx={{ textAlign: 'center', mb: '3rem' }}>
          <a href="http://t.me/ergopad" target="_blank">
            <Button 
              variant="contained"
              sx={{
                color: '#fff',
                fontSize: '1rem',
                py: '0.6rem',
                px: '1.2rem',
                mr: '1.7rem',
                textTransform: 'none',
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.hover,
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: theme.palette.primary.active,
                },
              }}
            >
              Telegram
            </Button>
          </a>

          <a href="https://discord.gg/E8cHp6ThuZ" target="_blank">
            <Button 
              variant="contained"
              sx={{
                color: '#fff',
                fontSize: '1rem',
                py: '0.6rem',
                px: '1.2rem',
                textTransform: 'none',
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.hover,
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: theme.palette.secondary.active,
                },

              }}
            >
              Discord
            </Button>
          </a>
        </Box>

      </Grid>
      <Grid item xs={12} md={7} sx={{ pb: { xs: 4, md: 16 } }}>
        <Image src="/ergo-illustration.png" alt="ErgoPad Illustration" layout="responsive" width="600" height="600" priority />
      </Grid>
    </Grid>
    </>
  );
};

export default Hero;
