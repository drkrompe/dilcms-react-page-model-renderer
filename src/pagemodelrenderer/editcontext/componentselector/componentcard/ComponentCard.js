import React from 'react';

require('./ComponentCard.scss');

export default class ComponentCard extends React.Component {

    render() {
        return (
            <div className="dem-component-card"
                draggable="true"
                onDragStart={(event) => {
                    event.dataTransfer.setData('text/plain', this.props.componentType)
                }}
            >
                > {this.props.componentType}
            </div>
        );
    }

}