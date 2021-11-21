import { useState } from 'react';
import { 
    Typography, 
    Accordion,
    AccordionSummary,
    AccordionDetails 
}  from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const AccordionComponent = ({ accordionItems, uniqueId }) => {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
<>
        {accordionItems.map((item, i) => {
            return (
                <>
                <Accordion expanded={expanded === ('panel_' + uniqueId + i)} onChange={handleChange(('panel_' + uniqueId + i))}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={'panel' + uniqueId + i + 'bh-content'}
                    id={'panel' + uniqueId + i + 'bh-header'}
                >
                    <Typography variant="h5" sx={{ flexShrink: 0, m: 0 }}>
                        {item.title}
                    </Typography>
                </AccordionSummary>
    
                <AccordionDetails>
                    <Typography variant="p">
                        {item.bodyText}
                    </Typography>
                </AccordionDetails>
                
            </Accordion>
            </>
                )
        })} 
        </>
        
    )
}

export default AccordionComponent

