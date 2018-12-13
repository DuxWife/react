import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { history } from '../core/history';
import { addNote, editNote } from '../api/api';


export interface Props {
  open: boolean;
  setStateDialog: () => void;
  loadNotes: () => void;
  idOfNote: number;
  note: string; 
}
export interface State {

}

class FormDialog extends React.Component<Props, State> {
  constructor(props: Props) {
     super(props);
     this.handleSubmit = this.handleSubmit.bind(this);
  };

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const note = event.target.note.value;
    if (this.props.idOfNote == 0) {
      await addNote(note).then(response => {
        this.props.loadNotes();
      })
      .catch(function(err) {
        console.log(err);
      });
    } else {
      await editNote(this.props.idOfNote, note).then(response => {
        this.props.loadNotes();
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  }

  render () {
    return (
      <div>
        <Dialog
          open={this.props.open}  
          aria-labelledby="form-dialog-title"
          maxWidth= 'lg'
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Note</DialogTitle>
          <form onSubmit={this.handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="note"
                label="Note"
                fullWidth
                multiline
                rows="5"
                rowsMax="50"
                variant="outlined"
                defaultValue = {this.props.note}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.setStateDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={this.props.setStateDialog} color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;