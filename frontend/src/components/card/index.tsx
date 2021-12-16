import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { cardProps } from "../../types/cardType";

/*const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);*/

/*const card = (
  <React.Fragment>
    
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);*/

export function CardUi({ content }: cardProps) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card>
                <CardContent>
                    {
                        content
                    }
                </CardContent>
            </Card>
        </Box>
    );
}