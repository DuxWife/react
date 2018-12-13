import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  card: {
    marginTop: theme.spacing.unit * 8,
    alignItems: 'center',
    maxWidth: 800,
  },
  media: {
    height: 200,
  },
});

export interface Props {
  classes: {
    main: string;
    card: string;
    media: string;
  };
}
export interface State {

}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
     super(props);
  };
  render () {
    return (
      <div className={this.props.classes.main}>
        <CssBaseline />
        <Card className={this.props.classes.card}>
            <CardMedia
              className={this.props.classes.media}
              image="https://iapplenews.ru/wp-content/uploads/2016/03/Notes-on-Mac_thumb800.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Привет!
              </Typography>
              <Typography component="p">
               Здесь можно оставлять заметки!
              </Typography>
            </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Home);