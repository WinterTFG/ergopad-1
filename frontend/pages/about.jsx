import { Typography, Container } from '@mui/material';
import PageTitle from '@components/PageTitle';
import MuiNextLink from '@components/MuiNextLink'

const About = () => {
  return (
    <>
        <Container maxWidth="760px" sx={{ maxWidth: '760px', mx: 'auto' }}>
            <PageTitle 
                title="About ErgoPad"
                subtitle="Read about our team, our philosophy, and how we plan to proceed into the future"
            />

            <Typography variant="h3">
                What is ErgoPad
            </Typography>
            <Typography variant="p">
                ErgoPad is a project incubator for offering token IDOs to provide funding for new projects within the Ergo ecosystem. Ergopad will release its own native token through an IDO (Initial Dex Offering), and users will be able to trade Ergo or SigUSD for these tokens and stake them through smart contracts. 
            </Typography>
            
            <Typography variant="p">
                If you stake ErgoPad tokens and reach one of the tiers outlined on the <MuiNextLink href="/staking">staking page</MuiNextLink>, you'll be given an opportunity to invest in seed sales for new projects. These seed sale prices will often be much lower than the price the tokens list at during the IDO.  
            </Typography>

            <Typography variant="p">
                SigUSD and Erg raised in the pre-sales will be used to build projects on the Ergo platform, to build out the ecosystem of dApps and bring the DeFi functionality needed to make Ergo a top 10 coin. 
            </Typography>

            <Typography variant="h3">
                Our Philosophy
            </Typography>

            <Typography variant="p">
                We believe that all people should have full access to and full control over their finances. 
                No government should have the right to control what someone can and can't invest in, or how 
                they can spend their money. We also believe control of the money supply should be taken from governments, since governments have proven they don't take the responsibility seriously enough, and contiunue to choose profits for the ultra-wealthy over fairness for common people. 
            </Typography>

            <Typography variant="p">
                As the government attempts to print us out of problem of their making, the resulting inflation erodes people's buying power. Corporations continue to charge more for goods and services, while refusing to give fair wages to workers.     
            </Typography>

            <Typography variant="p">
                Starting with Bitcoin, cryptocurrency is a financial revolution that will help free people from this cycle. While Bitcoin gave us a fantastic store of value, Ethereum proved that on-chain dApps could replace much of the financial services we traditionally have relied on investment banks and large hedge funds to provide. Anyone who has used Ethereum knows there are flaws in the design; you find out quick when a transaction costs over $80 USD in gas fees. However, it was a great proof of concept, and Ergo is here to carry that torch to the next stage of development. With a robust PoW backing, ingenious novel concepts like extended-UTXO, and NIPOPOWs, Ergo is set to be the next iteration in blockchain ecosystem solutions. 
            </Typography>

            <Typography variant="p">
                Because the eUTXO system is still in its infancy, the user experience is severly lacking in comparison to other projects like Ethereum that have had a several year head start. However, that leaves a lot of room for growth, and we would like to be part of that growth. 
            </Typography>

            <Typography variant="p">
                ErgoPad was created to generate financial backing for the developers who need it, so we can help the Ergo platform grow into a safe, accessible financial ecosystem where everyone can get involved. All dApps should provide an experience where a user's data is only shared when they want it to, and where they can leverage or spend their money any way they wish with minimal fees for doing so. Some devs don't have strong marketing skills, and other teams have a great idea and community but no devs to build it. That's where we come in. We can put teams together, raise funds, grow the communities, and create the future of financial free markets for all. We'd love to have you join us on this journey! 
            </Typography>

        </Container>
    </>
  );
};

export default About;