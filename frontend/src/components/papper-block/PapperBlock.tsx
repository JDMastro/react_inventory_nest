// @ts-nocheck
/* eslint-disable */
import React from 'react';
import clsx from 'clsx';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import useStyles from './style';

interface IPapperBlock extends PaperProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  upperRightBlock?: React.ReactNode;
  children: NonNullable<React.ReactNode>;
  whiteBg?: boolean;
  colorMode?: boolean;
  noMargin?: boolean;
  overflowX?: boolean;
}

const defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false,
  icon: <BookmarkBorderIcon />,
};

const PapperBlock: React.FC<IPapperBlock> = ({
  title,
  desc,
  upperRightBlock,
  children,
  whiteBg,
  noMargin,
  colorMode,
  overflowX,
  icon,
}: IPapperBlock) => {
  const classes = useStyles();
  return (
    <Paper
      className={clsx(
        classes.root,
        noMargin && classes.noMargin,
        colorMode && classes.colorMode
      )}
      elevation={0}
    >
      <div className={classes.block}>
        <div className={classes.upperLeftBlock}>
          <span className={classes.iconTitle}>{icon}</span>
          <div className={classes.titleText}>
            <Typography variant="h6" component="h2" className={classes.title}>
              {title}
            </Typography>
            <Typography component="p" className={classes.description}>
              {desc}
            </Typography>
          </div>
        </div>
        <div className={classes.upperRightBlock}>
          {upperRightBlock}
        </div>
      </div>
      <section
        className={clsx(
          classes.content,
          whiteBg && classes.whiteBg,
          overflowX && classes.overflowX
        )}
      >
        {children}
      </section>
    </Paper>
  );
};

PapperBlock.defaultProps = defaultProps;

export default PapperBlock;
