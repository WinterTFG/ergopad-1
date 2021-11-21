import { Box, Container }  from '@mui/material';
import CenterTitle from '@components/CenterTitle'

const boxStyles = {
    background: 'linear-gradient(rgba(35, 35, 39, 1), rgba(29, 29, 32, 1) 300px)',
    pt: '5rem',
    pb: '3rem',
    borderTopColor: 'rgba(46,46,51,1)!important',
    borderStyle: 'solid',
    border: 0,
    borderTop: 1
}

const Section = ({ title, subtitle, children, toggleOutside }) => {

    return (
        <>

            {toggleOutside ? (
                <>
                <CenterTitle 
                    title={title} 
                    subtitle={subtitle}
                />
                <Box sx={boxStyles}>

                    <Container maxWidth='lg' sx={{ }}>

                    {children}

                    </Container>
                </Box>
                </>
            
            ) : (

                <>
                    <Box sx={boxStyles}>
                    <Container maxWidth='lg' sx={{ }}>

                        <CenterTitle 
                            title={title} 
                            subtitle={subtitle}
                        />

                        {children}
                    </Container>
                </Box>
                </>
            )}
        </>
    )
}

export default Section