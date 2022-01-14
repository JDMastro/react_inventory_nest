// @ts-nocheck
/* eslint-disable */
import React from 'react';
import MuiBlockUi, { BlockUiProps } from 'react-block-ui';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import 'react-block-ui/style.css';

const useStyles = makeStyles(() => ({
  circularProgress: {
    position: 'fixed',
    top: 'calc(50% - 15px)',
    left: 'calc(50% - 45px)',
  },
}));

const defaultProps = {
  setCircularProgressProps: {
    size: 70,
    thickness: 1,
    color: 'primary',
  },
};

interface IBlockUi extends BlockUiProps {
  children: React.ReactNode;
  setCircularProgressProps?: CircularProgressProps;
}

const BlockUi: React.FC<IBlockUi> = ({
  children,
  setCircularProgressProps,
  ...props
}: IBlockUi) => {
  const classes = useStyles();

  return (
    <MuiBlockUi
      tag="div"
      loader={(
        <CircularProgress
          className={classes.circularProgress}
          {...setCircularProgressProps}
        />
      )}
      {...props}
    >
      {children}
    </MuiBlockUi>
  );
};

BlockUi.defaultProps = defaultProps;

export default BlockUi;
