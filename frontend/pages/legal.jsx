import { Typography, Container } from '@mui/material';
import PageTitle from '@components/PageTitle';
import MuiNextLink from '@components/MuiNextLink'

const Legal = () => {
  return (
    <>
        <Container maxWidth="760px" sx={{ maxWidth: '760px', mx: 'auto' }}>
            <PageTitle 
                title="Legal Info"
                subtitle="Details about the DAO and corporate structure behind Ergopad"
            />
            
            <Typography variant="p">
                <Typography variant="span" sx={{ color: 'text.primary' }}>ErgoPad is created and run by a Decentralized Autonomous Organization (DAO),</Typography> controlled by 5 
                board members who decide how to utilize funds and which projects to launch on ErgoPad. This 
                DAO also appoints a CEO, CTO, and CMO to run ErgoPad on a day-to-day basis, but keeps a close 
                eye on the projects and votes on any major decisions when necessary. 
            </Typography>

            <Typography variant="p">
                As a decentralized organization, the DAO does not fall under any one country's legal 
                jurisdiction. With that in mind, an investment in ErgoPad requires that you place your 
                trust in the actions of the board members. Each board member is motivated by an appreciation 
                for the tech behind Ergo, and a desire to see the ecosystem thrive. The DAO will always 
                strive to follow the philosophies laid out in the <MuiNextLink id="manifesto-01" 
                href="https://ergoplatform.org/en/blog/2021-04-26-the-ergo-manifesto/" target="_blank">Ergo Manifesto</MuiNextLink>.
            </Typography>

            <Typography variant="p">
                Legally speaking, a DAO is a decentralized, global organization. It does not fall under the jurisdiction of any one government. As with any investment, an investment in any token launched by ErgoPad has the potential to go to zero. By interacting with the smart contracts on the Ergo blockchain through this website, you must accept full responsiblity for your decisions and understand that members of the DAO cannot be held personally liable for any change in market conditions that affect the price of tokens launched on this platform. 
            </Typography>

            <Typography variant="p">
                The developers behind this website will take steps necessary to provide a bug-free and secure experience, but there is no guarantee of an absence of bugs and errors. 
            </Typography>

            <Typography variant="p">
                The team believes that everyone should have the right to have full control of their finances and no government should be able to stop you from investing your crypto in whatever you wish, but with those freedoms come inherent risks. Thus, we do not KYC, but we do our best to educate and explain everything up front, so you can make the best investment decision possible. 
            </Typography>
        </Container>
    </>
  );
};

export default Legal;