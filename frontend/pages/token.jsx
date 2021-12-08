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
    AccordionDetails,
    ListItemIcon,
    Icon
 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react';
import { VictoryContainer, VictoryPie } from 'victory';
import CenterTitle from '@components/CenterTitle';
import RelatedLinks from '@components/RelatedLinks/RelatedLinks';
import theme from '../styles/theme';
import MuiNextLink from '@components/MuiNextLink'

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
        x: 'Seed-sale',
        y: 27,
        color: '#3abab4'
    },
    {
        x: 'Pre-sale',
        y: 54,
        color: '#1A6BD2'
    },
    {
        x: 'Team',
        y: 8,
        color: '#3F7CDC'
    },
    {
        x: 'Liqudity',
        y: 12,
        color: '#36A9DA'
    },
]

const tokenCards = [
    {
        title: 'Token Name:',
        desc: 'ErgoPad'
    },
    {
        title: 'Blockchain:',
        desc: 'Ergo'
    },
    {
        title: 'Initial Available Supply:',
        desc: '12.7M'
    },
    {
        title: 'Market Cap at IDO:',
        desc: '254k SigUSD'
    },
    {
        title: 'Pre-sale Price:',
        desc: '0.02 SigUSD'
    },
    {
        title: 'Total Available Supply:',
        desc: '300M'
    },
]

const gridBox = {
    background: 'rgba(35, 35, 39, 0.7)',
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
        <Container maxWidth="lg" sx={{ mb: '3rem' }}>
            <CenterTitle 
                title="Tokenomics"
                subtitle="For Ergo projects, are tokenomics called Ergonomics? "
                main={true}
            />


                    <Grid container 
                        spacing={3} 
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch" 
                        sx={{ flexGrow: 1 }}
                     >

                        {tokenCards.map((value) => (
                            <Grid item md={4} sm={6} xs={12} sx={{ maxWidth: { xs: '320px' }}} key={value.title}>
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

        

        
            <Container maxWidth='lg' sx={{ }}>

            <Divider sx={{ my: 10 }} />
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
                    <Grid item md={4}>
                        <Box>
                            <List sx={{ color: theme.palette.text.secondary }}>
                                {tokenAllocation.map((value) => (
                                    <ListItem id={value.x} key={value.x}>
                                        <ListItemIcon>
                                            <Icon sx={{ color: value.color }}>square</Icon>
                                        </ListItemIcon>
                                        <ListItemText>
                                            {value.x}: {value.y}%
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>

            </Container>

           
            <Divider sx={{ my: 10, maxWidth: 'lg', mx: 'auto' }} />
            <Container maxWidth='md' sx={{ }}>

           

                <CenterTitle 
                    title="Token Utility" 
                    subtitle="How to put the ErgoPad token to use"
                />

                    <Accordion key="panel1" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography variant="h5" sx={{ width: '33%', flexShrink: 0, mb: 0 }}>
                            Governance
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="p">
                            Your tokens will give you a vote on certain decisions, such as which projects are launched on ErgoPad. 
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion key="panel2" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        >
                            <Typography variant="h5" sx={{ width: '33%', flexShrink: 0, mb: 0 }}>
                                Staking
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6">
                                Tiers
                            </Typography>
                            <Typography variant="p">
                                The more you stake, the higher the tier. More detail found on the <MuiNextLink href="/staking">Staking Page</MuiNextLink>. 
                            </Typography>
                            <Typography variant="h6">
                                Allocations
                            </Typography>
                            <Typography variant="p">
                                Each new IDO we release on ErgoPad will have a pre-sale for ErgoPad token stakers. Staking in a higher tier gives you an opportunity to get more tokens at the pre-sale price. 
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion key="panel3" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography variant="h5" sx={{ width: '33%', flexShrink: 0, mb: 0 }}>
                            Deflationary Mechanics
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="p">
                            We will add deflationary mechanics to the ErgoPad token. Similar to other platforms, there will be a lottery and other ways to earn which will also burn tokens. Early unstaking fees will be burned, removing those from the supply. 
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion key="panel4" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                        >
                        <Typography variant="h5" sx={{ width: '33%', flexShrink: 0, mb: 0 }}>
                            Liqudity Farming
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography variant="p">
                            If you aren&apos;t interested in investing in IDOs and feel liquidity farming will provide a greater yield than the current staking rewards, you can provide liquidity on ErgoDex. We may even release a dex of our own!
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
            </Container>
        
        
        <RelatedLinks title="Learn More" subtitle="" links={relatedLinkList} />
    </>
  );
};

export default Token;