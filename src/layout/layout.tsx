import * as React from 'react';

import { Router } from "./router";
import { getAllNotes } from '../api/api';
import CircularDeterminate from "../containers/CircularDeterminate";

interface LayoutState {
    authUser: boolean;
    loading: boolean;
};

interface LayoutProps {
};

class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);
    }
    mounted = false;
    unmounted = false;

    state = {
        loading: true,
        authUser : false,
    };

    componentDidMount() {
        this.mounted = true;
        getAllNotes().then(res => {
            this.setState({ authUser : true, loading: false });  
        })
        .catch(error => { 
            this.setState({ authUser : false, loading: false });
        })
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    setStateSafe = (newState) => {
        if (this.unmounted) {
            return;
        }
        if (this.mounted) {
            this.setState(newState);
        } else {
            this.state = {...this.state, ...newState};
        }
    };

    render() {
        return (
            <div>
                <CircularDeterminate {...this.state}/>
                <Router  {...this.state} setStateSafe = {this.setStateSafe}/>
            </div>
        )
    }
}

export default Layout;
