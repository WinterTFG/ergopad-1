import AssetList from '@components/dashboard/AssetList';
import GlassContainer from '@components/GlassContainer';
import { Grid, Typography, TextField, Box, Button, Backdrop, CircularProgress, Container } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { VictoryArea, VictoryContainer, VictoryPie } from 'victory';
import axios from 'axios';
import { useWallet } from 'utils/WalletContext'
// import { useAuth } from 'src/auth';

const rawData2 = 
{
  "address": "No assets",
  "balance": {
    "ERG": {
      "blockchain": "ergo",
      "balance": 0,
      "unconfirmed": 0,
      "tokens": [
        {
          "tokenId": "abcdefg",
          "amount": 1,
          "decimals": 0,
          "name": "No assets",
          "price": 1
        },
      ],
      "price": 1
    }
  }
}; 

const historicData = [
{ x: 1, y: 2 },
{ x: 2, y: 3 },
{ x: 3, y: 5 },
{ x: 4, y: 4 },
{ x: 5, y: 6}
];

const wantedHoldingData = tokenDataArray(rawData2);
// console.log(wantedHoldingData);

const portfolioValue = sumTotals(wantedHoldingData);
// console.log(portfolioValue);

const defaultHoldingData = wantedHoldingData.map((item) => {
  const container = {};
  container.x = item.x;
  container.y = 0;
  return container;
});
defaultHoldingData[defaultHoldingData.length - 1].y = portfolioValue;

const Dashboard = () => {

	const { wallet, setWallet } = useWallet()

	const [holdingData, setHoldingData] = useState(defaultHoldingData);
	const [assetList, setAssetList] = useState(assetListArray(rawData2));
	const [imgNftList, setImgNftList] = useState([]);
	const [audNftList, setAudNftList] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setHoldingData(wantedHoldingData); // Setting the data that we want to display
	}, []);

	const noAssetSetup = (() => {
		const noAssetList = [
			{
				id : 0,
				name : 'No assets'
			}
		]
		setAssetList(noAssetList);
		setAudNftList(noAssetList);
		setImgNftList(noAssetList);
		const noAssetArray = tokenDataArray(rawData2);
		setHoldingData(noAssetArray);
	});

	// console.log("current wallet = " + wallet.wallets)

	// const [refreshDashboard, setRefreshDashboard] = useState()

	useEffect(() => {

		async function getWalletData(address) {

			const defaultOptions = {
				headers: {
					'Content-Type': 'application/json',
					// Authorization: auth?.accessToken ? `Bearer ${auth.accessToken}` : '',
				},
			};
	
			const res = await axios
				.get(`${process.env.API_URL}/asset/balance/${address}`, { ...defaultOptions })
				.catch((err) => {
				console.log('ERROR FETCHING: ', err);
				});

			if (res?.data) {
				setLoading(true)

				let victoryData = tokenDataArray(res.data);
	
				// let portfolioTotal = sumTotals(victoryData);
	
				// create list of assets 
				let initialAssetList = assetListArray(res.data);
	
				let newImgNftList = [];
				let newAudNftList = [];
				let newAssetList = [];
	
				for(let i = 0; i < initialAssetList.length; i++){
					if (initialAssetList[i].id != 'ergid') {
						const res2 = await axios
						.get(`https://api.ergoplatform.com/api/v0/assets/${initialAssetList[i].id}/issuingBox`, { ...defaultOptions })
						.catch((err) => {
						console.log('ERROR FETCHING: ', err);
						});
						if (res2?.data) {
						let data2 = res2?.data;
	
							let tokenObject = {
								name: data2.map(token => token.assets[0].name),
								ch: data2.map(token => token.creationHeight),
								description: data2.map(token => toUtf8String(token.additionalRegisters.R5).substr(2)),
								r7: data2.map(token => token.additionalRegisters.R7),
								r9: data2[0].additionalRegisters?.R9 ? resolveIpfs(toUtf8String(data2[0].additionalRegisters?.R9).substr(2)) : undefined,
								r5: data2.map(token => toUtf8String(token.additionalRegisters.R5).substr(2)),
								ext: data2.map(token => toUtf8String(token.additionalRegisters.R9).substr(2).slice(-4)),
								token: initialAssetList[i].token,
								id: initialAssetList[i].id,
								amount: initialAssetList[i].amount,
								amountUSD: initialAssetList[i].amountUSD ? initialAssetList[i].amountUSD : ''
							}
	
							// console.log(tokenObject.r9);
							
							// if audio NFT
							if (tokenObject.ext == '.mp3' || tokenObject.ext == '.ogg' || tokenObject.ext == '.wma' || tokenObject.ext == '.wav' || tokenObject.ext == '.aac' || tokenObject.ext == 'aiff' || tokenObject.r7 == '0e020102'){
								newAudNftList[newAudNftList.length] = tokenObject;
							}
							// if image NFT
							else if (tokenObject.ext == '.png' || tokenObject.ext == '.gif' || tokenObject.ext == '.jpg' || tokenObject.ext == 'jpeg' || tokenObject.ext == '.bmp' || tokenObject.ext == '.svg' || tokenObject.ext == '.raf' || tokenObject.ext == '.nef' || tokenObject.r7 == '0e020101' || tokenObject.r7 == '0e0430313031' ) {
								newImgNftList[newImgNftList.length] = tokenObject;
							}
							else {
								newAssetList[newAssetList.length] = tokenObject;
							}
						}
					}
					else {
						newAssetList[newAssetList.length] = initialAssetList[i];
					}
				}
					
				setHoldingData(victoryData);
				setAssetList(newAssetList);
				setAudNftList(newAudNftList);
				setImgNftList(newImgNftList);
	
				// console.log(res.data);
				// console.log(victoryData);
				// console.log(assetListArray(res.data));
				// console.log(portfolioTotal);
			}
			console.log('API Call')
			setLoading(false)
		}

		// console.log(wallet.wallets)

		if (wallet.wallets && wallet.wallets != '') {
			getWalletData(wallet.wallets)
		}
		else {
			noAssetSetup()
		}
	}, [wallet])

  	return (
		<>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
        		<CircularProgress color="inherit" />
      		</Backdrop>
		<Container maxWidth='lg' sx={{ mx: 'auto' }}>
			<Grid container spacing={1} alignItems="stretch" sx={{ pt: 4 }}>

				<Grid item xs={12} md={6}>
					<GlassContainer>
						<Typography variant='h4'>Wallet Holdings</Typography>
						<VictoryPie
							id='victory-pie-chart'
							innerRadius={100}
							padAngle={2}
							data={holdingData}
							colorScale='cool'
							style={{ labels: { fill: 'white' } }}
							containerComponent={
							<VictoryContainer
								id='victory-pie-chart-container'
								style={{
								touchAction: 'auto',
								}}
							/>
							}
							animate={{ easing: 'exp' }}
						/>
					</GlassContainer>
				</Grid>
				
				<Grid item xs={12} md={6}>
					<GlassContainer>
					<Typography variant='h4'>Portfolio Hisory</Typography>
					<VictoryArea
						id='victory-area-chart'
						style={{ data: { fill: "rgb(57, 186, 181)" } }}
						data={historicData}
						containerComponent={
						<VictoryContainer
							id='victory-area-chart-container'
							style={{
							touchAction: 'auto',
							}}
						/>
						}
					/>
					</GlassContainer>
				</Grid>

				<Grid item xs={12} md={4}>
					<GlassContainer>
						<AssetList assets={assetList} title='Assets' />
					</GlassContainer>
				</Grid>
				
				<Grid item xs={12} md={4}>
					<GlassContainer>
						<AssetList assets={imgNftList} title='Image NFTs' />
					</GlassContainer>
				</Grid>

				<Grid item xs={12} md={4}>
					<GlassContainer>
						<AssetList assets={audNftList} title='Audio NFTs' />
					</GlassContainer>
				</Grid>
				
			</Grid>
		</Container>
		</>
	);
};

function tokenDataArray(data) {
  let tokenObject = data.balance.ERG.tokens;
  const keys = Object.keys(tokenObject);
  const res = [];
  for (let i = 0; i < keys.length; i++) {
    let token = tokenObject[keys[i]];
    let obj = {
      x: token.name,
      y: token.price * (token.amount * Math.pow(10, -token.decimals))
    };
    if (token.price > 0) res.push(obj);
  }
  const ergoValue = {
    x: 'Ergo',
    y: data.balance.ERG.price * data.balance.ERG.balance
  };
  if (ergoValue.y > 0) res.unshift(ergoValue);
  return res;
};

function assetListArray(data) {
  let tokenObject = data.balance.ERG.tokens;
  let keys = Object.keys(tokenObject);
  let res = [];
  for (let i = 0; i < keys.length; i++) {
    let token = tokenObject[keys[i]];
    let amount = +parseFloat((token.amount * Math.pow(10, -token.decimals)).toFixed(2))
    let price = (token.price * amount).toFixed(2)
    let obj = {
      token: token.name ? token.name.substring(0,3).toUpperCase() : '',
      name: token.name ? token.name : '',
      id: token.tokenId,
      amount: amount,
      amountUSD: price
    };
    
    res.push(obj);
  }
  const ergoValue = {
    token: 'ERG',
    name: 'Ergo',
    id: 'ergid',
    amount: data.balance.ERG.balance.toFixed(3),
    amountUSD: (data.balance.ERG.price * data.balance.ERG.balance).toFixed(2),
  };
  res.unshift(ergoValue);
  return res;
};

function sumTotals(data){
  let value = data.map((item) => item.y).reduce((a, b) => a + b);
  return value; 
}

function toUtf8String(hex) {
  if(!hex){
    hex = ''
  }
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

function resolveIpfs(url) {
  const ipfsPrefix = 'ipfs://'
  if (!url.startsWith(ipfsPrefix)) return url
  else return url.replace(ipfsPrefix, `https://cloudflare-ipfs.com/ipfs/`)
}

export default Dashboard;