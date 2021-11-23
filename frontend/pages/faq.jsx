import { Button, Icon, Box } from '@mui/material';
import Section from '@components/layout/Section';
import AccordionComponent from '@components/AccordionComponent';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import theme from '../styles/theme';
import Search from '@components/Search';

const faqItems = [
    {
        id: '1',
        title: 'test 1',
        bodyText: 'Answer',
        category: 'Token',
    },
    {
        id: '2',
        title: 'test 2',
        bodyText: 'Answer',
        category: 'Staking',
    },    
    {
        id: '3',
        title: 'test 3',
        bodyText: 'Answer',
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

    useEffect(() => {
        if (category === '') {
            setData(faqItems)
        }
        else {
            const newFaqItems = faqItems.filter(item => item.category === category)
            setData(newFaqItems)
        }
        
    }, [category])

    
  return (
    <>
        <Section
            title="Frequently Asked Questions"
            subtitle="You've got questions, we've got answers"
            main={true}
            toggleOutside={true}
            extra={<Search />}
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

            
            <AccordionComponent 
                accordionItems={data}
                uniqueId="faq"
            />
        </Section>
    </>
  );
};

export default Faq;