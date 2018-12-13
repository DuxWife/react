import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles ({
  progress: {
    margin: theme.spacing.unit * 2,
    left: '50%',
    top: '50%',
    position: 'absolute',
    zIndex: 1,
  },
  loading: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    background: '#FFFFFF',
  },
});

interface Props {
  classes: {
    progress: string;
    loading: string;
    background: string;
  };
  loading: boolean;
}

interface State {
  completed: number;
  timer: number;
}

class CircularDeterminate extends React.Component<Props, State> {
  constructor(props: Props) {
     super(props);
  };

  state = {
    completed: 0,
    timer: 0,
  };

  componentDidMount() {
    this.state.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    if (this.props.loading == true) {
    return (
      <div className={this.props.classes.loading}>
        <CircularProgress
          className={this.props.classes.progress}
          variant="determinate"
          value={this.state.completed}
          color="secondary"
        />
      </div>
    );
    } else { return null}
  }
}

export default withStyles(styles)(CircularDeterminate);