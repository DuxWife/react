import React from 'react';
import axios from 'axios';
import ListNotes from '../components/ListNotes';
import FormDialog from '../components/FormDialog';
import { NotesModel } from '../models/notes';
import { getAllNotes } from '../api/api';
import { history } from '../core/history';

export interface Props {
  loading: boolean;
  setStateSafe: (newState) => void;
}

export interface State {
  open: boolean;
  notes: NotesModel[];
  idOfNote: number;
  note: string;    
}

class Notes extends React.Component<Props, State> {
  constructor(props: Props) {
     super(props);

      this.state = {open: false, notes: [], idOfNote: 0, note: ''}

      this.setStateDialog = this.setStateDialog.bind(this);
      this.loadNotes = this.loadNotes.bind(this);
      this.addOrEdit = this.addOrEdit.bind(this);

  };

  componentDidMount() {
    this.loadNotes();
  }

  private addOrEdit(id, note) {
    this.setState({idOfNote: id, note: note});
    this.setStateDialog();
  }

  private async loadNotes(){
    this.props.setStateSafe({loading: true});
    await getAllNotes().then(res => {
      const notes = res.data;
      this.setState({ notes });
      this.props.setStateSafe({loading: false});
    })
    .catch(error => { 
      this.props.setStateSafe({loading: false});
      history.push("/login");
    })
  }

  private setStateDialog() {
    this.setState({open: !this.state.open});
  }

  render () {
    return (
        <div>          
          <ListNotes {...this.props} {...this.state} setStateDialog = {this.setStateDialog} loadNotes = {this.loadNotes} addOrEdit = {this.addOrEdit}/>
          <FormDialog {...this.props} {...this.state} setStateDialog = {this.setStateDialog} loadNotes = {this.loadNotes}/>
        </div>
    );
  }
}

export default Notes;