import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { history } from '../core/history';
import { logoutAPI } from '../api/api';

const styles = {
  root: {
    flexGrow: 1,
    margin: 0,
  },
  grow: {
    flexGrow: 1,
    textDecoration: 'none',
  },
};

export interface Props {
  classes: {
    root: string;
    grow: string;
  };
  authUser: boolean;
  setStateSafe: (newState) => void;
}
export interface State {
}

class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  async handleSubmit() {
    this.props.setStateSafe({loading: true});
    await logoutAPI().then(response => {
      this.props.setStateSafe({loading: false});
      this.props.setStateSafe({authUser: !this.props.authUser});
      history.push("/login");        
    })
    .catch(function(err) {
      this.props.setStateSafe({loading: false});
      history.push("/login");
    });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={this.props.classes.grow} component={Link} {...{ to: "/notes" }}>
              Notes
            </Typography>
            {this.props.authUser ?
              <Button  type="submit" color="inherit" onClick={this.handleSubmit}>Logout</Button>
            :
              <div>
                <Button  color="inherit" component={Link} {...{ to: "/login" }}>Login</Button>
                <Button  color="inherit" component={Link} {...{ to: "/register" }}>Register</Button>              
              </div>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(NavBar);