import { Grid, Typography, Button, Box, Image }  from '@mui/material';
import LowerGradients from '@components/stylistic/LowerGradients';
import theme from '../styles/theme';

const Hero = ({ title, subtitle }) => {
  return (
    <>
    {/* <Box maxWidth='lg' sx={{ position: 'relative', mx: 'auto', height: '0', pointerEvents: 'none', zIndex: '-100' }} aria-hidden="true">
      <LowerGradients />
    </Box> */}

    <Grid container spacing={2} sx={{ pt: 10 }}>
      <Grid item xs={12} sm={7} sx={{ mb: 8 }}>
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

          <a href="https://discord.gg/M9VJ9XUMuA" target="_blank">
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
      <Grid item xs={12} sm={5}>
        
      </Grid>
    </Grid>
    </>
  );
};

export default Hero;
