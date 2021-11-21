import { Typography, Icon, Container, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import MuiNextLink from '@components/MuiNextLink'

const LinkIcon = styled('div')(({ theme }) => ({

}))

const LinkTitle = styled('div')(({ theme }) => ({

}))

const LinkCaption = (({ theme }) => ({
    
}))

const HoverArrow = styled('div')(({ theme }) => ({

    '&:hover': {

    }
}))

const RelatedLinkItem = ({ link }) => {

    const extraStyles = {
        bgcolor: link.background,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        py: '1rem',
        color: '#fff',
        borderRadius: 2,
        textDecoration: 'none',
        '&:hover': {
            
        }
    }
  
  return (
    
        <Grid item md={4} xs={12} sx={{ maxWidth: '320px' }}>
            <MuiNextLink href={link.href} sx={{ textDecoration: 'none' }}> 
                <Box sx={extraStyles}>
                    <LinkIcon>
                        <Icon fontSize="large" >
                            {link.icon}
                        </Icon>
                    </LinkIcon>
                    <LinkTitle>
                        <Typography variant="h4" sx={{ }}>
                            {link.title}
                        </Typography>
                    </LinkTitle>
                    <Typography sx={LinkCaption}>
                        {link.caption}
                    </Typography>
                    <HoverArrow>
                        <Icon>
                            east
                        </Icon>
                    </HoverArrow>
                </Box>
            </MuiNextLink> 
        </Grid>
    
  );
};

export default RelatedLinkItem;
