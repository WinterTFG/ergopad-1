import { Button, Icon, Box, Typography } from '@mui/material';
import Section from '@components/layout/Section';
import AccordionComponent from '@components/AccordionComponent';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import theme from '../styles/theme';
import Search from '@components/Search';
import { useSearch } from '../utils/SearchContext';

const faqItems = [
    // {
    //     id: '0',
    //     title: '',
    //     bodyText: '',
    //     category: '',
    // },
    {
        id: '1',
        title: 'Will you only support projects that build on Ergo, or will you support projects on other blockchains like Cardano?',
        bodyText: 'We will definitely support cross-chain projects in the future, as long as they also have utility on the Ergo blockchain',
        category: 'Company',
    },
    {
        id: '2',
        title: 'What will the use-cases be for the ErgoPad token?',
        bodyText: 'You can stake ErgoPad tokens which will generate new tokens based on the number you have staked and the emission schdule. If you reach one of the staking tiers, you\'ll get pool allocation which gives you an opportunity to buy into new projects launched on ErgoPad at seed-sale prices not always open to the public.',
        category: 'Token Staking',
    },
    {
        id: '3',
        title: 'How will ErgoPad vet each project that it launches?',
        bodyText: 'Projects will be vetted based on the team, the uniqueness of the project, the use-case, how far along the project is, how much they expect to raise, and how likely the project is a good candidate for a token. If a project is a piece of software that doesn\'t necessarily benefit from the token IDO method, we may try to raise funds through our marketing but not necessarily a token IDO. ',
        category: 'Company',
    },
    {
        id: '4',
        title: 'How do we sign up for whitelist to invest in the ErgoPad token, and what info will you need?',
        bodyText: 'You\'ll need to join either telegram or discord, and supply a social account such as linkedin, twitter, reddit... anywhere that you have some kind of online prescence so we can confirm you\'re not just using duplicate wallets. Signup will be a form you submit on the website. ',
        category: 'Token',
    },
    {
        id: '5',
        title: 'When ergopad goes live will there be projects ready day 1? ',
        bodyText: 'Yes, we have projects in the pipeline that we will announce before the IDO date. ',
        category: 'Company',
    },
]

const SortButton = styled(Button)({
    borderRadius: `20px`,
    background: theme.palette.greyButton.background,
    color: theme.palette.text.tertiary,
    fontSize: '1rem',
    textTransform: 'none',
    '&:hover': {
        background: theme.palette.greyButton.hover,
    },
  });

const Faq = () => {

    const [category, setCategory] = useState('')
    const [data, setData] = useState(faqItems)
    const { search, setSearch } = useSearch()

    useEffect(() => {
        if (category === '') {
            setData(faqItems)
        }
        else {
            const newFaqItems = faqItems.filter(item => item.category.includes(category))
            setData(newFaqItems)
        }
        
    }, [category])

    useEffect(() => {
        if (search != '') {
            let lowerCase = search.toLowerCase()
            const filtered = faqItems.filter(item => {
                return (item.title.toLowerCase().includes(lowerCase) || item.bodyText.toLowerCase().includes(lowerCase))
            })

            setData(filtered)
        }
        else {
        setData(faqItems)
        }
    }, [search])
    
  return (
    <>
        <Section
            title="Frequently Asked Questions"
            subtitle="You've got questions, we've got answers"
            main={true}
            toggleOutside={true}
            extra={<Search placeholder="Filter questions" />}
        >

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: '2rem'
            }}>

                <SortButton 
                    variant="contained" 
                    disableElevation 
                    onClick={() => setCategory('')} 
                    startIcon={<Icon>list</Icon>}
                >
                    View All
                </SortButton>

                <SortButton 
                    variant="contained" 
                    disableElevation 
                    onClick={() => setCategory('Token')} 
                    sx={category === 'Token' ? { 
                        background: theme.palette.primary.active,
                        color: theme.palette.primary.main,
                        '&:hover': {
                            background: theme.palette.primary.active,
                        }
                    } : {}}
                    startIcon={<Icon color="primary">toll</Icon>}
                >
                    Token
                </SortButton>

                <SortButton 
                    variant="contained" 
                    disableElevation 
                    onClick={() => setCategory('Staking')} 
                    sx={category === 'Staking' ? { 
                        background: theme.palette.secondary.active,
                        color: theme.palette.secondary.main,
                        '&:hover': {
                            background: theme.palette.secondary.active,
                        }
                    } : {}}
                    startIcon={<Icon color="secondary">auto_graph</Icon>}
                >
                    Staking
                </SortButton>

                <SortButton 
                    variant="contained" 
                    disableElevation 
                    onClick={() => setCategory('Company')} 
                    sx={category === 'Company' ? { 
                        background: theme.palette.tertiary.active,
                        color: theme.palette.tertiary.main,
                        '&:hover': {
                            background: theme.palette.tertiary.active,
                        }
                    } : {}}
                    startIcon={<Icon sx={{ color: theme.palette.tertiary.main }}>business</Icon>}
                >
                    Company
                </SortButton>

            </Box>



            {data.length != 0 ? (
                <AccordionComponent 
                    accordionItems={data}
                    uniqueId="faq"
                />
            ):(
                <Typography variant="p">
                    No questions found
                </Typography>
            )}
            
        </Section>
    </>
  );
};

export default Faq;