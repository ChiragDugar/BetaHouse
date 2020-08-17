import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './LoggedInMenu.scss';

class LoggedInMenu extends Component {
    render() {
        return (
            <div className={this.props.show ? `show-logged-in-menu logged-in-menu` : `hide-logged-in-menu logged-in-menu`}>
                Logged in
            </div>
        )
    }
}

export default LoggedInMenu;