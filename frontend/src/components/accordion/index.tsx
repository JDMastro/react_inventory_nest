import { accordionProps } from "../../types/accordionType";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export function AccordioUi({ panel, tittle, content, tittleSecond, key, handleChange, expanded}: accordionProps) {
 

    return (
        <Accordion expanded={expanded === panel} onChange={handleChange}  key={key}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${panel}-content`}
                id={`panel-${panel}-header`}
                key={key}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }} key={key}>
                    { tittle }
                </Typography>
                <Typography sx={{ color: 'text.secondary' }} key={key}>{tittleSecond}</Typography>
            </AccordionSummary>
            <AccordionDetails key={key}>
                { content }
            </AccordionDetails>
        </Accordion>
    )

}