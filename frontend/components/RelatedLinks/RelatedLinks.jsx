import { Typography, Box, Container, Grid } from '@mui/material';
import CenterTitle from '@components/CenterTitle';
import RelatedLinkItem from './RelatedLinkItem';

// { id: 0, title: '', caption: '', icon: '', href: '', background: '' },

const Projects = ({ title, subtitle, links }) => {
  return (
    <>
        
        <Box sx={boxStyles}>
            <Container maxWidth='lg'>
                <CenterTitle 
                    title={title}
                    subtitle={subtitle}
                />
                    <Grid container spacing={3} alignItems="stretch" justifyContent="center" sx={{ flexGrow: 1, }}> 
                        {links.map((link) => {
                            return <RelatedLinkItem key={link.id} link={link} />;
                        })} 
                    </Grid>

            </Container>
        </Box>
    </>
  );
};

const boxStyles = {
    background: 'linear-gradient(rgba(35, 35, 39, 1), rgba(29, 29, 32, 1) 600px)',
    pt: 6,
    borderTopColor: 'rgba(46,46,51,1)!important',
    borderStyle: 'solid',
    border: 0,
    borderTop: 1
}

export default Projects;