import { 
    Typography, 
    Box, 
    Container, 
    Grid, 
    IconButton
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CenterTitle from '@components/CenterTitle';
import RelatedLinks from '@components/RelatedLinks/RelatedLinks';
import theme from '../styles/theme';
import Search from '@components/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const relatedLinkList = [
    { 
        id: 0, 
        title: 'Documentation', 
        caption: 'Read about how Ergopad Works', 
        icon: 'auto_stories', 
        href: 'https://github.com/ergo-pad/ergopad/blob/main/docs/README.md', 
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
                main={true}
            />
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <Search placeholder="Search projects" sx={{ }} />
            </Box>
        </Container>
        
        
        <Container maxWidth='lg' sx={{ }}>

            <Typography variant="h4" sx={{ fontWeight: '800', mb: 4 }}>
                Upcoming
            </Typography>

            <Grid container spacing={3} alignItems="stretch" sx={{ mb: 6 }}>
            
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt=""
                                height="180"
                                image="/projects/crypto-coins.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    SigmaSwap Decentralized Exchange
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ErgoPad&apos;s own decentralized exchange on the Ergo blockchain. 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ justifyContent: 'right' }}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            
                        </CardActions>
                    </Card> 
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt=""
                                height="180"
                                image="/projects/nft-game.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    NFT Game
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    An NFT game where you can play to earn, rather than pay to play. 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ justifyContent: 'right' }}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            
                        </CardActions>
                    </Card> 
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt=""
                                height="180"
                                image="/projects/social-media-platforms.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Decentralized Social Platform
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    A social media platform where users are given control of their data, and are paid by advertisers directly. You&apos;re the commodity, may as well keep all the value you provide. 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ justifyContent: 'right' }}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            
                        </CardActions>
                    </Card> 
                </Grid>
                
            </Grid>

            <Typography variant="h4" sx={{ fontWeight: '800', mb: 4 }}>
                Launched
            </Typography>

        </Container>
        
        
        <RelatedLinks title="Learn More" subtitle="" links={relatedLinkList} />
    </>
  );
};

export default Projects;