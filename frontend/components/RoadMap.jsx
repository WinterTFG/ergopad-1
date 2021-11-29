import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import theme from '../styles/theme';

const timelineItems = [
	{
		date: 'December 10, 2021 - December 17, 2021',
		title: 'Seed Sale Whitelist Week',
		body: 'An opportunity to sign up for the seed sale will last one week. Signup form will be on this website, and shared on all social platforms. '
	},
	{
		date: 'December 17, 2021',
		title: 'Seed Sale',
		body: 'ErgoPad Seed Sale tokens are released'
	},
	{
		date: 'December 22, 2021 - December 29, 2021',
		title: 'Pre-Sale Whitelist Week',
		body: 'Sign up for reserved acces to the secondary Pre-Sale, the last chance to get ErgoPad tokens before launch'
	},
	{
		date: 'December 26, 2021',
		title: 'First IDO Projects announced',
		body: 'Before the pre-sale date, we will announce some of the first IDOs, so you know what to expect if you want to get into the Pre-Sale'
	},
	{
		date: 'December 29, 2021',
		title: 'Pre-Sale',
		body: 'ErgoPad Pre-Sale tokens are released'
	},
	{
		date: 'Late January',
		title: 'ErgoPad IDO',
		body: 'Date TBD, late January will be the launch of ErgoPad tokens and release on ErgoDex. '
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
						<Typography variant="h6" component="span">
							{item.title}
						</Typography>
						<Typography color="text.secondary">
							{item.body}
						</Typography>
					</TimelineContent>
				</TimelineItem>
			);
		})} 
      </Timeline>
    )
}

export default RoadMap