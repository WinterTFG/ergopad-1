import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from '../styles/theme';

const timelineItems = [
	{
		date: 'December 10, 2021 - December 17, 2021',
		title: 'Seed Sale Whitelist Week',
		body: 'An opportunity to sign up for the seed sale will last one week. Signup form will be on this website, and shared on all social platforms. ',
		passed: true
	},
	{
		date: 'December 17, 2021',
		title: 'Seed Sale',
		body: 'ErgoPad Seed Sale contracts become available. Whitelisted users will have 24 hours to send Erg and secure their tokens.'
	},
	{
		date: 'December 26, 2021',
		title: 'Strategic Sale Whitelist',
		body: 'Sign up to reserve access to the strategic sale'
	},
	{
		date: 'December 30, 2021',
		title: 'Strategic sale',
		body: 'ErgoPad Strategic Sale contracts become available. Whitelisted users will have 24 hours to send Erg and secure their tokens.'
	},
	{
		date: 'January 2, 2022',
		title: 'First IDO Announcements',
		body: 'By this date, we will announce at least one of the first IDOs launched on ErgoPad.'
	},
	{
		date: 'January 12, 2022',
		title: 'Pre-Sale Whitelist',
		body: 'Sign up to reserve access to the pre-sale, the final sale before tokens are release to decentralized exchanges'
	},
	{
		date: 'January 14, 2022',
		title: 'Pre-Sale',
		body: 'ErgoPad pre-sale contracts become available. Whitelisted users will have 24 hours to send Erg and secure their tokens.'
	},
	{
		date: 'January 26, 2022',
		title: 'ErgoPad IDO',
		body: 'ErgoPad IDO where tokens will be available to trade, and the first vesting rounds are unlocked. '
	},
	{
		date: 'Late January',
		title: 'IDO Project promotions and pre-sale dates announced',
		body: 'There will be some projects that will IDO shortly after the ErgoPad release so your staked tokens can be used for pool allocations. '
	}
]




const RoadMap = () => {
    return (
      <Timeline position="right" sx={{ mt: -3 }}>
		{timelineItems.map((item, i) => {
			return (
				<Box key={`timeline_item_${i}`}>

				<TimelineItem>
					<TimelineOppositeContent
						sx={{  m: 'auto 0', maxWidth: '30%' }}
						align="right"
						variant="body2"
						color="text.secondary"
					>
						{item.date}
					</TimelineOppositeContent>
					<TimelineSeparator>
						{(i == 0) ? '' : <TimelineConnector />}
							<TimelineDot />
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent sx={{ py: '12px', px: 2 }}>
						<Typography variant="h6" component="span" color={item.passed ? theme.palette.text.secondary : theme.palette.text.primary}  sx={{ textDecoration: (item.passed ? 'line-through' : 'none') }} >
							{item.title}
						</Typography>
						<Typography color="text.secondary">
							{item.body}
						</Typography>
					</TimelineContent>
				</TimelineItem>
				</Box>
			);
		})} 
      </Timeline>
    )
}

export default RoadMap