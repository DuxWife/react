import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, Typography, Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import { NotesModel } from '../models/notes';
import { deleteNote } from '../api/api';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 3,
  },

  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },

  table: {
    minWidth: 700,
  },

  fab: {
    margin: theme.spacing.unit * 3,
  },
});

interface Props {
  open: boolean;
  notes: NotesModel[];
  setStateDialog: () => void;
  loadNotes: () => void;
  addOrEdit: (id, note) => void;
  classes: {
    root: string;
    paper: string;
    table: string;
    fab: string;
  };

}
interface State {
}

class ListNotes extends React.Component<Props, State> {
  constructor(props: Props) {
     super(props);
     this.deleteButton = this.deleteButton.bind(this);
  };

  async deleteButton(id){
    await deleteNote(id).then(response => {
      this.props.loadNotes();
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  render () {
    return (
  	  <div className={this.props.classes.root}>
  		  <Grid container spacing={24}>
  			  <Grid item xs={12}>
  			    <Paper className={this.props.classes.paper}>
  	        	<Typography variant="h4" gutterBottom>
  		        	Todo List
  		        	<Fab onClick={() => {this.props.addOrEdit(0, '')}} size="medium" color="primary" aria-label="Add" className={this.props.classes.fab}>
  	        			<AddIcon />
  					     </Fab>
  		        </Typography>

              <Table className={this.props.classes.table}>
              
                <TableHead>				        
  			          <TableRow>
  			            <TableCell>id</TableCell>
  			            <TableCell>created_at</TableCell>
  			            <TableCell>updated_at</TableCell>
  			            <TableCell>Note</TableCell>
  			            <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
  			          </TableRow>
  			        </TableHead>

  			        <TableBody>
  			          {this.props.notes.map(row => {
  			            return (
  			              <TableRow key={row.id}>
  			                <TableCell>{row.id}</TableCell>
  			                <TableCell>{row.created_at}</TableCell>
  			                <TableCell>{row.updated_at}</TableCell>
  			                <TableCell>{row.note}</TableCell>
  			                <TableCell>
                          <Fab size="small" color="secondary" aria-label="Edit" onClick={() => {this.props.addOrEdit(row.id, row.note)}}>
                            <Icon>edit_icon</Icon>
                          </Fab>
                        </TableCell>
                        <TableCell>
                          <Fab size="small" aria-label="Delete" onClick={() => {this.deleteButton(row.id)}}>
                            <DeleteIcon />
                          </Fab>
                        </TableCell>
  			              </TableRow>
  			            );
  			          })}
  			        </TableBody>

  			      </Table>
  			    </Paper>
  			  </Grid>
  		  </Grid>
  	  </div>
    );
  }
}

export default withStyles(styles)(ListNotes);