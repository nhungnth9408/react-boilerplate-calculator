import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import MenuList from '@material-ui/core/MenuList';
// import MenuItem from '@material-ui/core/MenuItem';
// import Paper from '@material-ui/core/Paper';
// import { withStyles } from '@material-ui/core/styles';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Typography from '@material-ui/core/Typography';
// import Popover from '@material-ui/core/Popover';

import {
  MenuList,
  MenuItem,
  Paper,
  withStyles,
  ListItemIcon,
  ListItemText,
  Typography,
  Popover,
} from '@material-ui/core';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import './menu.css';
import ChildItem from './ChildItem';
const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

class MenuListComposition extends Component {
  state = {
    anchorEl: null,
    // idxValue: 0,
  };

  handlePopoverOpen = event => {
    this.setState({
      anchorEl: event.currentTarget,
      // idxValue: event.target.id,
    });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  table() {
    return (
      // <div>
      //   <ul>
      //     <li>{this.state.idxValue}</li>
      //     <li>{this.state.idxValue}</li>
      //   </ul>
      // </div>
      <ChildItem />
    );
  }

  item(classes, open, anchorEl, value, idx) {
    return (
      <ListItemText classes={{ primary: classes.primary }}>
        <input
          type="text"
          value={value}
          id={idx}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={this.handlePopoverOpen}
          // onMouseLeave={this.handlePopoverClose}
          onClick={this.handlePopoverClose}
          className="input-item-name"
        />
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography
            type="text"
            value={value}
            id={idx}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={this.handlePopoverOpen}
            onMouseLeave={this.handlePopoverClose}
            // onClick={this.handlePopoverClose}
            className="input-item-name"
          >
            {this.table(idx)}
          </Typography>
        </Popover>
      </ListItemText>
    );
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const itemName = ['Hover', 'Drafts', 'Inbox'];
    return (
      <Paper className="paper">
        <MenuList>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <SendIcon />
            </ListItemIcon>
            {this.item(classes, open, anchorEl, itemName[0], 0)}
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <DraftsIcon />
            </ListItemIcon>
            {this.item(classes, open, anchorEl, itemName[1], 1)}
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <InboxIcon />
            </ListItemIcon>
            {this.item(classes, open, anchorEl, itemName[2], 2)}
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);
