import React from 'react';
import PropTypes from 'prop-types';

import { Paper, withStyles, Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function ChildItem(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={6} sm={6} container spacing={16}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} container spacing={16}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.paper}>x</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

ChildItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChildItem);
