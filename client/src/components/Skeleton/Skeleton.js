import { memo, useEffect } from 'react';
import { Skeleton as Boilerplate } from '@material-ui/lab';
import { Grow } from '@material-ui/core';
import { useStyles } from './SkeletonClasses';
import clsx from 'clsx';

function Skeleton({ visible = true, children, className, ...props }) {
  const classes = useStyles();

  if (visible) return (
    <div className={clsx(classes.root, className)}>
      <Grow
        in={visible}
        className={classes.grow}
      >
        <Boilerplate
          width="100%"
          height="100%"
          {...props}
        />
      </Grow>
      {!visible && children}
    </div>
  )
}

export default memo(Skeleton);