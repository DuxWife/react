import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import { history } from '../core/history';
import { registerAPI } from '../api/api';

const styles = (theme: Theme) => createStyles({
  main: {
    width: 'auto',
    display: 'block', 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export interface Props {
  classes: {
    main: string;
    paper: string;
    avatar: string;
    form: string;
    submit: string;
  };
  authUser: boolean;
  setStateSafe: (newState) => void;
}
export interface State {
}

class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const password_confirmation = event.target.password_confirmation.value;
    await registerAPI(name, email, password, password_confirmation).then(response => {
      this.props.setStateSafe({authUser: !this.props.authUser});
      history.push("/notes");
    })
    .catch(function(err) {
      history.push("/register");
    });
  }

  render() {
    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input name="name" type="name" id="name" autoFocus/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email"/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
              <Input name="password_confirmation" type="password" id="password_confirmation" autoComplete="current-password" />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" color="primary" className={this.props.classes.submit}>
              Register
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Register);