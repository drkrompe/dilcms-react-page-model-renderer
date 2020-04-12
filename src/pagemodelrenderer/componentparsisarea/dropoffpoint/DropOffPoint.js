import React from 'react';
import ClassNames from '../../../utils/ClassNames';

require('./DropOffPoint.scss');

const DragOverState = {
    DRAGGING_OVER: 'dragging-over',
    NOT_DRAGGING_OVER: ''
}

export default class DropOffPoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dragOverState: DragOverState.NOT_DRAGGING_OVER
        };
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }

    handleDragEnter = (event) => {
        this.setState({
            dragOverState: DragOverState.DRAGGING_OVER
        });
        this.props.onDragEnter && this.props.onDragEnter();
    }

    handleDragLeave = (event) => {
        console.log("exit")
        this.setState({
            dragOverState: DragOverState.NOT_DRAGGING_OVER
        });
        this.props.onDragLeave && this.props.onDragLeave();
    }

    handleDrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        this.setState({
            dragOverState: DragOverState.NOT_DRAGGING_OVER
        });
        this.props.onDrop && this.props.onDrop(data);
    }

    render() {
        return (
            <div
                className={ClassNames('dem-dropoff-point', this.state.dragOverState, this.props.className)}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}>
                {this.props.children}
            </div>
        )
    }
}