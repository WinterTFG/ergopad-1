import { useState, useEffect } from "react";
import { 
    Button, 
    Dialog, 
    TextField, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    FormHelperText,
} from '@mui/material';
// import FormControl, { useFormControl } from '@mui/material/FormControl';
import { useWallet } from 'utils/WalletContext';
import { Address } from "utils/Address";
import theme from "../styles/theme";

export const AddWallet = () => {
    const [walletInput, setWalletInput] = useState('');
    const [open, setOpen] = useState(false);
    const [walletButtonText, setWalletButtonText] = useState('Connect Wallet');

    const { wallet, setWallet } = useWallet()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setWalletInput('');
    };

    const handleWalletFormChange = (e) => {
        setWalletInput(e.target.value);
    };

    const handleSubmitWallet = () => {
        // console.log('wallet input = ' + walletInput)
        setOpen(false);
        localStorage.setItem('Address', walletInput);
        setWalletButtonText(walletInput)
        setWallet({wallets: walletInput})
        setWalletInput('');
    };

    const clearWallet = () => {
        // setOpen(false);
        setWallet({wallets: ''})
        localStorage.removeItem('Address');
        setWalletButtonText('Connect Wallet');
        // console.log(wallet.wallets)
    }

    useEffect(() => {
        if (localStorage.getItem('Address')) {
            const item = localStorage.getItem('Address')
            if (walletButtonText != item) {
                setWallet({wallets: item})
                setWalletButtonText(item)
                // console.log(wallet.wallets)
            }
        }
    }, []);

  return (
    <>
        <Button 
        variant="contained"
        id="walletButton"
        sx={{
            color: '#fff',
            fontSize: '1rem',
            px: '1.2rem',
            textTransform: 'none',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.hover,
                boxShadow: 'none',
            },
            '&:active': {
                backgroundColor: theme.palette.primary.active,
            },
            textOverflow: 'ellipsis',
            maxWidth: '10em',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        }}
        onClick={handleClickOpen}>
            {walletButtonText}
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Enter your Ergo wallet public key. This will be used to interact with smart contracts and display assets on the dashboard. Your public key
                will never be stored on our server. 
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Wallet address"
                type="wallet"
                fullWidth
                variant="standard"
                value={walletInput}
                onChange={handleWalletFormChange}
                error={!isAddressValid(walletInput)}
            />
            <FormHelperText error={true}>
                {!isAddressValid(walletInput) ? 'Invalid ergo address.' : ''}
            </FormHelperText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
                <Button onClick={ () => clearWallet() }>Remove wallet</Button>
                <Button onClick={handleClose}>Close Window</Button>
                <Button onClick={handleSubmitWallet} disabled={!isAddressValid(walletInput)}>Connect wallet</Button>
            </DialogActions>
        </Dialog>
    </>
  );
};

function isAddressValid(address) {
    try {
        return (new Address(address).isValid())
    } catch (_) {
        return false
    }
}

export default AddWallet;