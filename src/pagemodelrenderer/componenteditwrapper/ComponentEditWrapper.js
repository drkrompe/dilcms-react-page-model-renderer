import React from 'react';
import axios from 'axios';
import ClassNames from '../../utils/ClassNames';
import ComponentParsisArea, { ParsisAreaFocusState } from '../componentparsisarea/ComponentParsisArea';

require('./ComponentEditWrapper.scss');

export default class ComponentEditWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusState: ParsisAreaFocusState.NOT_FOCUSED
        };
    }

    handleFocusChange = (parsisFocusState) => {
        this.setState({
            focusState: parsisFocusState
        });
    }

    handleClick = () => {
        axios.delete(
            `/pages${window.location.pathname.split('.')[0]}/component/${this.props.type}/${this.props.componentId}`,
            {},
            {}
        )
            .then(response => window.location.reload())
            .catch(error => {
                console.error("Component drop error: ", error);
            });
    }

    render() {

        return (
            <ComponentParsisArea onFocusChange={this.handleFocusChange}
                componentId={this.props.componentId}
            >
                {this.props.children}
                < div className={ClassNames('button-container', this.state.focusState)} >
                    <label htmlFor="click-button">
                        Selecting this will delete the component: 
                    </label>
                    <button id="click-button"
                        onClick={this.handleClick}
                    >
                        Delete
                    </button>
                </div >
            </ComponentParsisArea>
        );
    }
}