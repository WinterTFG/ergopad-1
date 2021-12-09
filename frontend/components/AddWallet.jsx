import { useEffect, useState } from "react";
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
import { useWallet } from 'utils/WalletContext';
import { useAddWallet } from 'utils/AddWalletContext'
import { Address } from "utils/Address";

export const AddWallet = () => {
    const [walletInput, setWalletInput] = useState('');
    const { addWalletOpen, setAddWalletOpen } = useAddWallet()
    const { wallet, setWallet } = useWallet()

    useEffect(() => {
        if (localStorage.getItem('Address')){
            setWallet(localStorage.getItem('Address'))
        }
    }, [])

    const handleClose = () => {
        setAddWalletOpen(false);
        setWalletInput('');
    };

    const handleWalletFormChange = (e) => {
        setWalletInput(e.target.value);
    };

    const handleSubmitWallet = () => {
        setAddWalletOpen(false);
        localStorage.setItem('Address', walletInput);
        setWallet(walletInput)
        setWalletInput('');
    };

    const clearWallet = () => {
        setWallet('')
        localStorage.removeItem('Address');
    }

  return (
    <>
        <Dialog open={addWalletOpen} onClose={handleClose}>
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