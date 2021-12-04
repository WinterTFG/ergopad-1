import { Typography, Grid, Box, TextField, Button } from '@mui/material';
import CenterTitle from '@components/CenterTitle';
import theme from '../styles/theme';

const Apply = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

  };

  return (
    <>
        
		<CenterTitle 
			title="Contact ErgoPad"
			subtitle="Fill out the form below to apply to launch your IDO on ErgoPad"
			main={true}
		/>

        <Grid container maxWidth='lg' sx={{ mx: 'auto', flexDirection: 'row-reverse', px: {xs: 2, md: 3 } }}>
            
			<Grid item md={8}>
				<Box component="form" noValidate onSubmit={handleSubmit}>
					<Typography variant="h4" sx={{ mb: 4, fontWeight: '700' }}>
						IDO Application form:
					</Typography>
					<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
						InputProps={{ disableUnderline: true }}
						name="projectName"
						required
						fullWidth
						id="projectName"
						label="Project Name"
						autoFocus
						variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
						InputProps={{ disableUnderline: true }}
						required
						fullWidth
						multiline
						id="description"
						label="Project Description"
						name="description"
						variant="filled"
						rows={6}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
						InputProps={{ disableUnderline: true }}
						required
						fullWidth
						name="project-value"
						label="Expected USD needed to fund your project"
						type="project-value"
						id="project-value"
						variant="filled"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
						InputProps={{ disableUnderline: true }}
						fullWidth
						name="competitors"
						label="List your known competitors"
						type="competitors"
						id="competitors"
						variant="filled"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
						InputProps={{ disableUnderline: true }}
						fullWidth
						name="pitch-deck"
						label="Link your pitch deck"
						type="pitch-deck"
						id="pitch-deck"
						variant="filled"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
						InputProps={{ disableUnderline: true }}
						fullWidth
						name="white-paper"
						label="Link your whitepaper"
						type="white-paper"
						id="white-paper"
						variant="filled"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
						InputProps={{ disableUnderline: true }}
						required
						fullWidth
						id="name"
						label="Your Name"
						name="name"
						type="name"
						variant="filled"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
						InputProps={{ disableUnderline: true }}
						fullWidth
						required
						name="email"
						label="Your Email"
						type="email"
						id="email"
						variant="filled"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
						InputProps={{ disableUnderline: true }}
						required
						fullWidth
						id="telegramHandle"
						label="Your Telegram handle"
						name="telegramHandle"
						variant="filled"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
						InputProps={{ disableUnderline: true }}
						fullWidth
						required
						name="telegramGroup"
						label="Telegram group link"
						type="telegramGroup"
						id="telegramGroup"
						variant="filled"
						/>
					</Grid>
					</Grid>
					<Button
					type="submit"
					fullWidth
					disabled
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					>
					Submit *
					</Button>
					<Box xs={12} sm={6} sx={{ textAlign: 'right' }}>
						<Typography variant="p" sx={{ fontSize: '0.9rem'}}>* Form not currently connected to mail-server</Typography>
					</Box>
				</Box>
			</Grid>

			<Grid item md={4} sx={{flexGrow: 1}}>
				<Box sx={{ mr: { md: 12, xs: 0 }, mt: { md: 0, xs: 4 } }}>
					<Typography variant="h4" sx={{ fontWeight: '700', lineHeight: '1.2' }}>
						Not ready to apply? 
					</Typography>
				
					<Typography variant="p" sx={{ fontSize: '1rem', mb: 3 }}>
						You can find the team on these social platforms: 
					</Typography>

					<Box>
						<a href="http://t.me/ergopad" target="_blank" rel="noreferrer">
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

						<a href="https://discord.gg/E8cHp6ThuZ" target="_blank" rel="noreferrer">
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
				</Box>
			</Grid>


        </Grid>
    </>
  );
};

export default Apply;