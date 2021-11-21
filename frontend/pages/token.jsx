import { 
    Typography, 
    Box, 
    Container, 
    Grid, 
    List, 
    ListItem,
    ListItemText,
    Divider, 
    Accordion,
    AccordionSummary,
    AccordionDetails
 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react';
import { VictoryContainer, VictoryPie } from 'victory';
import CenterTitle from '@components/CenterTitle';
import RelatedLinks from '@components/RelatedLinks/RelatedLinks';
import theme from '../styles/theme';

const boxStyles = {
    background: 'linear-gradient(rgba(35, 35, 39, 1), rgba(29, 29, 32, 1) 300px)',
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
        title: 'Staking', 
        caption: 'How to earn with ErgoPad tokens', 
        icon: 'auto_graph', 
        href: '/staking', 
        background: theme.palette.primary.main 
    },
    { 
        id: 1, 
        title: 'Projects', 
        caption: 'See the projects we are building', 
        icon: 'app_shortcut', 
        href: '/projects', 
        background: theme.palette.secondary.main 
    },
    { 
        id: 2, 
        title: 'Documentation', 
        caption: 'Read more about how ErgoPad Works', 
        icon: 'auto_stories', 
        href: '/documentation', 
        background: theme.palette.tertiary.main
    },
]

const tokenAllocation = [
    {
        x: 'Public Pre-sale',
        y: 10
    },
    {
        x: 'Team',
        y: 10
    },
    {
        x: 'Public Sale',
        y: 60
    },
    {
        x: 'Liqudity',
        y: 20
    },
]

const tokenCards = [
    {
        title: 'Token Name:',
        desc: 'ErgoPad'
    },
    {
        title: 'Token ID:',
        desc: 'TBD'
    },
    {
        title: 'Blockchain:',
        desc: 'Ergo'
    },
    {
        title: 'Initial Supply:',
        desc: '10M'
    },
    {
        title: 'Market Cap at IDO:',
        desc: '150,000 SigUSD'
    },
    {
        title: 'IDO Token Price:',
        desc: '0.35 SigUSD'
    }
]

const gridBox = {
    background: 'rgba(35, 35, 39, 1)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    p: '1rem',
    color: '#fff',
    borderRadius: 2,
    border: 1,
    borderColor: 'rgba(46,46,51,1)'
}

const Token = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
        <Container maxWidth="lg" sx={{ mt: '5rem', mb: '3rem' }}>
            <CenterTitle 
                title="Tokenomics"
                subtitle="The ErgoPad tokenomics and uses"
            />


                    <Grid container 
                        spacing={3} 
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch" 
                        sx={{ flexGrow: 1 }}
                     >

                        {tokenCards.map((value) => (
                            <Grid item md={4} sm={6} xs={12} sx={{ maxWidth: {xs: '320px'}}}>
                            <Box sx={gridBox}>
                                <Typography>
                                    {value.title}
                                </Typography>
                                <Typography variant="h3" sx={{ mb: 0 }}>
                                    {value.desc}
                                </Typography>
                            </Box>
                        </Grid>
                        ))}

                    </Grid>

        </Container>

        

        <Box sx={boxStyles}>
            <Container maxWidth='lg' sx={{ }}>

                <CenterTitle 
                    title="Token Allocation" 
                    subtitle="The ErgoPad token will be released in public sales only. No VCs, no private allocation. We believe in fair access."
                />

                <Grid container sx={{ mb: '4rem' }} alignItems="center">
                    <Grid item md={8} align="center">
                        <VictoryPie
                            id='victory-pie-chart-2'
                            innerRadius={50}
                            data={tokenAllocation}
                            colorScale={[
                                '#3abab4',
                                '#1A6BD2',
                                '#3F7CDC',
                                '#36A9DA',
                            ]}
                            style={{ labels: { fill: 'white' } }}
                            containerComponent={
                                <VictoryContainer
                                    id='victory-pie-chart-container'
                                    style={{
                                        touchAction: 'auto',
                                        maxWidth: '500px'
                                    }}
                                />
                            }
                            
                        />
                    </Grid>
                    <Grid item md={4} >
                        <Box>
                            <List sx={{ color: theme.palette.text.secondary }}>
                                {tokenAllocation.map((value) => (
                                    <ListItem id={value.x}><ListItemText>
                                        {value.x}: {value.y}%
                                    </ListItemText></ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>

            </Container>
        </Box>

        <Box sx={boxStyles}>
            <Container maxWidth='lg' sx={{ }}>

                <CenterTitle 
                    title="Token Utility" 
                    subtitle="How to put the ErgoPad token to use"
                />
                        
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
                            Governance
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="p">
                            Your tokens will give you a vote on DAO decisions, which will be outlined in more detail shortly. 
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        >
                            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
                                Staking
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6">
                                Tiers
                            </Typography>
                            <Typography variant="p">
                                The more you stake, the higher the tier. More detail added soon. 
                            </Typography>
                            <Typography variant="h6">
                                Allocations
                            </Typography>
                            <Typography variant="p">
                                Each new IDO we release on ErgoPad will have a pre-sale for ErgoPad token stakers. Staking in a higher tier gives you an opportunity to get more tokens at the pre-sale price. 
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
                            Deflationary Mechanics
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="p">
                            We will add deflationary mechanics to the ErgoPad token. Similar to other platforms, there will be a lottery and other ways to earn which will also burn tokens. 
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                        >
                        <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
                            Liqudity Farming
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="p">
                            If you aren't interested in investing in IDOs and feel liquidity farming will provide a greater yield than the current staking rewards, you can provide liquidity on ErgoDex
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
            </Container>
        </Box>
        
        <RelatedLinks title="Learn More" subtitle="Want to get more info about how these projects started?" links={relatedLinkList} />
    </>
  );
};

export default Token;