import React from 'react';
import ComponentEditWrapper from './componenteditwrapper/ComponentEditWrapper';
import ComponentParsisArea from './componentparsisarea/ComponentParsisArea';
import EditContext from './editcontext/EditContext';

export default class PageModelRenderer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getAndRenderPageModel();
    }

    getAndRenderPageModel = () => {
        let componentMappingFunc = this.props.webComponentToReactComponentFunc
        if (window.location.pathname.endsWith('.editor')) {
            componentMappingFunc = this.wrapReactComponentWithComponentEditor
        }

        this.getPageModel()
            .then(pageModel => pageModel.components)
            .then(pageComponents => pageComponents.map(
                component => componentMappingFunc(JSON.parse(component))
            ))
            .then(pageComponents => { // EditMode First component parsis
                if (pageComponents.length > 0) {
                    return pageComponents;
                }
                if (!window.location.pathname.endsWith('.editor')) {
                    return pageComponents;
                }
                return pageComponents.concat(
                    <ComponentParsisArea>
                        Drop Components into here
                    </ComponentParsisArea>
                );
            })
            .then(renderableComponents => { // EditMode Edit Context
                if (!window.location.pathname.endsWith('.editor')) {
                    return renderableComponents;
                }
                return (
                    <EditContext>
                        {renderableComponents}
                    </EditContext>
                );
            })
            .then(renderableComponents => this.setState({
                children: renderableComponents
            }));
    }

    getPageModel = () => {
        return fetch(`/model${window.location.pathname}.page-model.json`)
            .then(response => response.json())
            .catch(error => {
                console.error('Model Load error: ', error);
                return Promise.resolve({
                    components: [
                        JSON.stringify({componentType: 'header'}),
                        JSON.stringify({componentType: 'sampletext'})
                    ]
                });
            });
    }

    wrapReactComponentWithComponentEditor = (webComponent) => {
        return (
            <ComponentEditWrapper type={webComponent.componentType} componentId={webComponent.componentId}>
                {this.props.webComponentToReactComponentFunc(webComponent)}
            </ComponentEditWrapper>
        );
    }

    render() {
        return this.state.children || "";
    }


}