import React from 'react';
import ComponentCard from './componentcard/ComponentCard';

require('./ComponentSelector.scss');

export default class ComponentSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getAvailableComponents();
    }

    getAvailableComponents = () => {
        fetch('/components')
            .then(response => response.json())
            .catch(error => {
                console.error('ComponentTypes Load Error error: ', error);
                return Promise.resolve({
                    componentTypes: [
                        'hello',
                        'header'
                    ]
                });
            })
            .then(response => response.componentTypes)
            .then(componentTypes => componentTypes.map(
                componentType => <ComponentCard componentType={componentType} />
            ))
            .then(renderableComponents => this.setState({
                children: renderableComponents
            }));
    }

    render() {
        return (
            <div className='dem-component-selector'>
                <p1 className='title'>
                    Registered App Components
                </p1>
                <hr className='horizontal-rule'/>
                {this.state.children}
            </div>
        );
    }

}