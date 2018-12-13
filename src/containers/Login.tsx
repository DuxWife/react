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
import { loginAPI } from '../api/api';
import { history } from '../core/history';

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

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
     super(props);
     this.handleSubmit = this.handleSubmit.bind(this);
  };

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = event.target.email.value;
    const password = event.target.password.value;
    await loginAPI(email, password).then(response => {
      this.props.setStateSafe({authUser: !this.props.authUser});
      history.push("/notes");
    })
    .catch(function(err) {
      console.log(err);
      history.push("/login");
    });
  }

  render () {
    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus value="test@test.test"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" value="123456"/>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" className={this.props.classes.submit}>
              Login
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}
export default withStyles(styles)(Login);