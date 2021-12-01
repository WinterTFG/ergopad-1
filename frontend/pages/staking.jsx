import { Typography, Container, Box, Grid, Button, Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CenterTitle from '@components/CenterTitle';
import theme from '../styles/theme';

const stakingItem = (item) => { 
	const extraStyles = {
		background: item.background,
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
		<>
			<Grid item md={4} xs={12} sx={{ maxWidth: '380px' }}>
					<Box sx={extraStyles}>

						<Typography variant="h5" sx={{ fontWeight: '700', my: 1 }}>
							{item.title}
						</Typography>

						<Typography variant="h4" sx={{ fontWeight: '800', my: 1 }}>
							{item.value}
						</Typography>
					</Box>
			</Grid>
		</>
)}

const stakingItems = [
	{
		title: 'Number of Stakers',
		value: '1234',
		background: theme.palette.primary.main
	},
	{
		title: 'ErgoPad Tokens Staked',
		value: '12.3M',
		background: theme.palette.secondary.main
	},
	{
		title: 'Current APY',
		value: '94.3%',
		background: theme.palette.tertiary.main
	},
]

const gridBox = {
    background: 'rgba(35, 35, 39, 0.7)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    p: 4,
    color: '#fff',
    borderRadius: 2,
    border: 1,
    borderColor: 'rgba(46,46,51,1)',
	maxWidth: '300px',
	minWidth: '240px'
}

const unstakeFees = [
	{
		fee: '25%',
		time: 'Less than 2 weeks',
	},
	{
		fee: '20%',
		time: 'Between 2 and 4 weeks',
	},
	{
		fee: '12.5%',
		time: 'Between 4 and 6 weeks',
	},
	{
		fee: '5%',
		time: 'Between 6 and 8 weeks',
	},
	{
		fee: '0%',
		time: 'More than 8 weeks',
	},
]

const Staking = () => {
  return (
    <>
        <Container sx={{ mb: '3rem' }}>
            <CenterTitle 
                title="Stake Your Tokens"
                subtitle="Connect your wallet and stake your tokens to receive staking rewards and early access to upcoming IDOs"
                main={true}
            />
        </Container>

            <Container maxWidth='lg' sx={{ }}>

                
                <Grid container spacing={3} alignItems="stretch" justifyContent="center" sx={{ flexGrow: 1, mb: 3 }}> 
					{stakingItems.map((item) => {
						return stakingItem(item)
					})} 
                </Grid>

				<Grid container spacing={3} sx={{ mt: 8, justifyContent: 'space-between', flexDirection: { xs: 'column-reverse', md: 'row' } }}>
      				<Grid item xs={12} md={8} sx={{ pr: { lg: 12, xs: 0 } }}>
						<Typography variant="h3">
							Instructions
						</Typography>
						<Typography variant="p">
							Stake your tokens by first connecting your wallet above, then click on the Stake button. There, enter the number of tokens you'd like to stake, and the dApp will generate a contract for you to send the tokens to. Send the exact number of tokens (and Erg to cover fees) that is given. If you make a mistake and the contract doesn't work, it will refund you. If you send too much but the contract goes through, the leftover amount can be skimmed from the network by bots. Please follow the instructions carefully and send the correct amount!
						</Typography>
						<Typography variant="p">
							Once staked, you will earn rewards based on the Current APY, which will be automatically compounded for you. When you decide to unstake, use the withdrawal button and follow the instructions. As with staking, please get the exact values correct when you make the transaction. You must cover the transaction fees to initiate the withdrawal contract. Luckily, this is not Eth, and the fees are very low. 
						</Typography>
						<Typography variant="p">
							Please note, if you choose to unstake early, there will be a fee as outlined to the right. 
						</Typography>
						<Typography variant="p">
							When new IDOs are announced on ErgoPad, we will also announce a snapshot date and time. If you are staking during that time, you will be eligible to receive an allocation of the IDO tokens at a reduced price. This will be weighted based on your staking tier. You'll be able to check your allocation on this website and interact with the sales contract. 
						</Typography>
						

						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
							<Button 
								variant="contained"
								
								sx={{
									color: '#fff',
									fontSize: '1rem',
									py: '0.6rem',
									px: '1.2rem',
									textTransform: 'none',
									background: theme.palette.tertiary.main,
									'&:hover': {
									background: theme.palette.tertiary.hover,
									boxShadow: 'none',
									},
									'&:active': {
									background: theme.palette.tertiary.active,
									},
								}}
							>
								Stake Now
							</Button>
						</Box>
						
					</Grid>
					<Grid item xs={12} md={4} sx={{  }}>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
							<Typography variant="h5" sx={{ fontWeight: '700' }}>
								Your Holdings
							</Typography>
						</Box>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Box sx={gridBox}>
                                <Typography>
                                    ErgoPad Staked
                                </Typography>
                                <Typography variant="h3" sx={{ mb: 3 }}>
                                    1234
                                </Typography>
								<Typography>
                                    Rewards
                                </Typography>
                                <Typography variant="h3" sx={{ mb: 3 }}>
                                    1234
                                </Typography>
								<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
									<Button 
										variant="contained"
										sx={{
											color: '#fff',
											fontSize: '1rem',
											py: '0.6rem',
											px: '1.2rem',
											textTransform: 'none',
											background: theme.palette.secondary.main,
											'&:hover': {
											background: theme.palette.secondary.hover,
											boxShadow: 'none',
											},
											'&:active': {
											background: theme.palette.secondary.active,
											},
										}}
									>
										Withdraw
									</Button>
								</Box>
                            </Box>
						</Box>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, flexDirection: 'column' }}>
							<Typography variant="h5" sx={{ fontWeight: '700', mt: 6 }}>
								Early Unstaking Fees
							</Typography>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell sx={{ fontWeight: '800' }}>
											Fee
										</TableCell>
										<TableCell sx={{ fontWeight: '800' }}>
											Time staked
										</TableCell>
										
									</TableRow>
								</TableHead>
								
								<TableBody>

									{unstakeFees.map((fee) => {
										return(
											<TableRow>
												<TableCell sx={{ color: theme.palette.text.secondary, fontWeight: '800' }}>
													{fee.fee}
												</TableCell>
												<TableCell>
													{fee.time}
												</TableCell>
											</TableRow>
										)
									})}
									
								</TableBody>
							</Table>
						</Box>
					</Grid>
				</Grid>
            </Container>

			
            <Container maxWidth='lg' sx={{ }}>
				<Divider sx={{ my: 10,  }} />
				<CenterTitle 
					title="Staking Tiers"
					subtitle="Higher tier stakers will receive a higher pool allocation on IDOs"
				/>

			</Container>



    </>
  );
};

export default Staking;