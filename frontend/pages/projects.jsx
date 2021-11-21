import { Typography, Box, Container, Grid, List, ListItem } from '@mui/material';
import CenterTitle from '@components/CenterTitle';
import RelatedLinks from '@components/RelatedLinks/RelatedLinks';
import theme from '../styles/theme';

const boxStyles = {
    background: 'linear-gradient(rgba(46, 46, 51, 0.3), rgba(29, 29, 32, 0.3) 300px)',
    pt: '5rem',
    pb: '3rem',
    borderTopColor: 'rgba(46,46,51,1)!important',
    borderStyle: 'solid',
    border: 0,
    borderTop: 1
}

const relatedLinkList = [
    { 
        id: 0, 
        title: 'Documentation', 
        caption: 'Read about how Ergopad Works', 
        icon: 'auto_stories', 
        href: '/documentation', 
        background: theme.palette.primary.main
    },
    { 
        id: 1, 
        title: 'About', 
        caption: 'Learn more about who we are', 
        icon: 'emoji_people', 
        href: '/about', 
        background: theme.palette.secondary.main
    },
    { 
        id: 2, 
        title: 'Apply for IDO', 
        caption: 'Submit your own project proposal', 
        icon: 'chat', 
        href: '/apply', 
        background: theme.palette.tertiary.main 
    },
]

const Projects = () => {
  return (
    <>
        <Container sx={{ mb: '3rem' }}>
            <CenterTitle 
                title="ErgoPad Projects"
                subtitle="Building the future of the Ergo ecosystem"
            />
        </Container>
        <Box sx={boxStyles}>
            <Container maxWidth='lg' sx={{ }}>

                <Grid container>
                    <Grid item >
                        
                    </Grid>
                    <Grid item>
                        <Typography variant="p">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                            in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>

                        <Typography variant="p">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
                            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
                            numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
                        </Typography>
                    </Grid>
                </Grid>

            </Container>
        </Box>
        
        <RelatedLinks title="Learn More" subtitle="Want to get more info about how these projects started?" links={relatedLinkList} />
    </>
  );
};

export default Projects;