import { Divider, Typography, SvgIcon } from '@mui/material';
import { styled } from '@mui/system';

const StyledAsset = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  // marginBottom: theme.spacing(2),
  // padding: theme.spacing(1),
  // borderRadius: '10px',
  // justifyContent: 'space-between',
  // backgroundColor: `rgba( 255, 255, 255, 0.04)`,
}));

const AssetIcon = styled('img')(({ theme }) => ({
  width: '50px',
  height: 'auto',
  borderRadius: '12px',
}));

const IconWrapper = styled('div')(({ theme }) => ({
  width: '50px',
  height: 'auto',
  borderRadius: '12px',
  background: 'rgba(102, 102, 102, 0.3)',
}));


const AssetNameContainer = styled('div')(({ theme }) => ({
  flexGrow: 2,
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  maxWidth: '240px',
  '& .MuiTypography-root': {
    padding: 2,
  },
}));
const AssetAmountContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const AssetItem = ({ asset, stableDenominator = 'USD' }) => {
  
  const AssetImage = () => {
    if (asset?.r9) {
      return (
        <AssetIcon src={asset?.r9} />
      )
    }
    else {
      return (
      <IconWrapper>
        <SvgIcon fontSize='large'>

        </SvgIcon>
      </IconWrapper>
      )
    }
  }
  
  return (
    <StyledAsset className='asset'>
      <AssetImage />
      <AssetNameContainer>
        {/* <Typography>{asset.token}</Typography> */}
        <Typography sx={{ 
          maxWidth: '180px',
          display: 'block', 
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}>
          {asset.name}
        </Typography>
      </AssetNameContainer>
      <AssetAmountContainer>
        <Typography>{asset.amount}</Typography>
        <Typography variant='caption'>
          ${asset.amountUSD} {stableDenominator}
        </Typography>
      </AssetAmountContainer>
    </StyledAsset>
  );
};

export default AssetItem;
