import { Typography, Grid, Box, TextField, Button, Container } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import PageTitle from '@components/PageTitle';
import theme from '../styles/theme';
// import axios from 'axios';
import { useWallet } from 'utils/WalletContext'
import { useAddWallet } from 'utils/AddWalletContext'
import { useState, useEffect } from 'react';

const initialFormData = Object.freeze({
    sigValue: "",
    ergoAddress: ""
  });

const Purchase = () => {

    const [formData, updateFormData] = useState(initialFormData);

    const { wallet } = useWallet()
    const { setAddWalletOpen } = useAddWallet()

    const openWalletAdd = () => {
        setAddWalletOpen(true)
    }

    useEffect(() => {
        updateFormData({
            ...formData,
            ergoAddress: wallet
          });
    }, [wallet])

    const handleChange = (e) => {
        updateFormData({
          ...formData,
            
          // Trimming any whitespace
          [e.target.name]: e.target.value.trim()
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // axios.post(`${process.env.API_URL}/util/email`, { ...formData })
        // .then(res=>{
        //     console.log(res);
        //     console.log(res.data);
        // })
        // .catch((err) => {
        //     console.log('ERROR POSTING: ', err);
        //     });

    };

  return (
    <>
        <Container maxWidth="lg" sx={{ px: {xs: 2, md: 3 } }}>
		<PageTitle 
			title="Purchase ErgoPad Tokens"
			subtitle="If you are approved for seed-sale whitelist, you can purchase tokens here."
		/>
        </Container>

        <Grid container maxWidth='lg' sx={{ mx: 'auto', flexDirection: 'row-reverse', px: {xs: 2, md: 3 } }}>

            <Grid item md={4} sx={{ pl: { md: 4, xs: 0 } }}>
				<Box sx={{ mt: { md: 0, xs: 4 } }}>
                    <Typography variant="h4" sx={{ fontWeight: '700', lineHeight: '1.2' }}>
                        Details
                    </Typography>
                
                    <Typography variant="p" sx={{ fontSize: '1rem', mb: 3 }}>
                        You must be pre-approved on whitelist to be able to purchase tokens. Add your wallet address to check if you have an allocation available. 
                    </Typography>
				</Box>
			</Grid>

			<Grid item md={8}>
				<Box component="form" noValidate onSubmit={handleSubmit}>
					<Typography variant="h4" sx={{ mb: 3, fontWeight: '700' }}>
						Token Purchase Form
					</Typography>
                    <TextField
                        InputProps={{ disableUnderline: true }}
                        required
                        fullWidth
                        id="sigValue"
                        label="How much would you like to invest"
                        name="sigValue"
                        variant="filled"
                        helperText="Enter value in sigUSD (max $5000), we'll convert to Erg for you"
                        sx={{ mb: 3 }}
                        onChange={handleChange}
                    />

                    <FormControl
                        variant="filled" 
                        fullWidth
                        required
                    >
                        <InputLabel htmlFor="ergoAddress" sx={{'&.Mui-focused': { color: 'text.secondary'}}}>
                            Ergo Wallet Address
                        </InputLabel>
                        <FilledInput
                            id="ergoAddress"
                            value={wallet}
                            onClick={openWalletAdd}
                            readOnly
                            disableUnderline={true}
                            name="ergoAddress"
                            type="ergoAddress"
                            sx={{ 
                                width: '100%', 
                                border: '1px solid rgba(82,82,90,1)', 
                                borderRadius: '4px', 
                            }}
                        />
                        <FormHelperText>
                            Your address must be pre-approved on the whitelist
                        </FormHelperText>
                    </FormControl>

                    <FormGroup sx={{mt: 3 }}>
                        <FormControlLabel control={<Checkbox />}
                            label="I have confirmed that I am legally entitled to invest in a cryptocurrency project of this nature in the jurisdiction in which I reside" 
                            sx={{ color: theme.palette.text.secondary, mb: 3 }} 
                        />
                        <FormControlLabel control={<Checkbox />}
                            label="I am aware of the risks involved when investing in a project of this nature. There is always a chance an investment with this level of risk can lose all it's value, and I accept full responsiblity for my decision to invest in this project" 
                            sx={{ color: theme.palette.text.secondary, mb: 3 }} 
                        />
                        <FormControlLabel control={<Checkbox />}
                            label="I understand that the funds raised by this project will be controlled by the ErgoPad DAO, which has board members throughout the world. I am aware that this DAO does not fall within the jurisdiction of any one country, and accept the implications therein." 
                            sx={{ color: theme.palette.text.secondary, mb: 3 }} 
                        />
                    </FormGroup>

					<Button
                        type="submit"
                        fullWidth
                        // disabled
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
					>
                        Submit
					</Button>
				</Box>
			</Grid>

        </Grid>
    </>
  );
};

export default Purchase;