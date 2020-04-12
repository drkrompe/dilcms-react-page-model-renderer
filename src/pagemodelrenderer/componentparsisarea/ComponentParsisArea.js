import React from 'react';
import ClassNames from '../../utils/ClassNames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DropOffPoint from './dropoffpoint/DropOffPoint';
import axios from 'axios';

require('./ComponentParsisArea.scss');

export const ParsisAreaHoverState = {
    HOVERED: 'hovered',
    NOT_HOVERED: ''
};

export const ParsisAreaFocusState = {
    FOCUSED: 'clicked',
    NOT_FOCUSED: ''
};

const DeterminedState = {
    OUTLINED: 'outlined',
    NOT_OUTLINED: ''
};

export default class ComponentParsisArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverState: ParsisAreaHoverState.NOT_HOVERED,
            editContextClicked: ParsisAreaFocusState.NOT_FOCUSED
        };
    }

    handleMouseOver = (hoverState) => {
        this.setState({
            hoverState
        });
        this.props.onHoverChange && this.props.onHoverChange(hoverState);
    }

    handleFocusChange = (focusState) => {
        this.setState({
            focusState: focusState
        });
        this.props.onFocusChange && this.props.onFocusChange(focusState);
    }

    determineState = () => {
        const shouldShowContextOutline = (this.state.hoverState === ParsisAreaHoverState.HOVERED
            || this.state.focusState === ParsisAreaFocusState.FOCUSED)
            ? DeterminedState.OUTLINED : DeterminedState.NOT_OUTLINED
        return {
            shouldShowContextOutline,
        };
    }

    handleComponentDrop = (whichDropPoint, componentType) => {
        const body = JSON.stringify({
            componentId: this.props.componentId,
            placement: whichDropPoint
        });
        const headers = {
            'Content-Type': 'application/json'
        }
        const options = {
            headers
        };

        axios.post(
            `/pages${window.location.pathname.split('.')[0]}/component/${componentType}`,
            body,
            options
        )
            .then(response => window.location.reload())
            .catch(error => {
                console.error("Component drop error: ", error);
            });
    }

    render() {
        const determinedState = this.determineState();

        return (
            <ClickAwayListener
                onClickAway={() => this.handleFocusChange(ParsisAreaFocusState.NOT_FOCUSED)}
            >
                <div className={ClassNames('dem-component-parsis', determinedState.shouldShowContextOutline)}
                    onMouseEnter={() => this.handleMouseOver(ParsisAreaHoverState.HOVERED)}
                    onMouseLeave={() => this.handleMouseOver(ParsisAreaHoverState.NOT_HOVERED)}
                    onClick={() => this.handleFocusChange(ParsisAreaFocusState.FOCUSED)}
                >
                    <DropOffPoint className={'dropoff-point'}
                        onDragLeave={() => this.handleMouseOver(ParsisAreaHoverState.NOT_HOVERED)}
                        onDragEnter={() => this.handleMouseOver(ParsisAreaHoverState.HOVERED)}
                        onDrop={(componentType) => {
                            this.handleComponentDrop('top', componentType);
                        }}
                    />
                    {this.props.children}
                    <DropOffPoint className={'dropoff-point'}
                        onDragLeave={() => this.handleMouseOver(ParsisAreaHoverState.NOT_HOVERED)}
                        onDragEnter={() => this.handleMouseOver(ParsisAreaHoverState.HOVERED)}
                        onDrop={(componentType) => {
                            this.handleComponentDrop('bottom', componentType);
                        }}
                    />

                </div>
            </ClickAwayListener>
        )
    }
}