import React from 'react';
//import Typography from '@material-ui/core/Typography';
//import { makeStyles, Theme } from '@material-ui/core/styles';

import { Typography ,Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  paperUpperRightBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  paperUpperRightBlockItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  paperUpperRightBlockKey: {
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
  },
}));

const UpperRightBlock = ({ list }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.paperUpperRightBlock}>
      {list.map((item: any, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className={classes.paperUpperRightBlockItem}>
          <Typography
            className={classes.paperUpperRightBlockKey}
            variant="body1"
          >
            {item.key}
          </Typography>
          <Typography variant="body2">{item.value}</Typography>
        </div>
      ))}
    </div>
  );
};

export default UpperRightBlock;
