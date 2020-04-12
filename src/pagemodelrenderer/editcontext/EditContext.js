import React from 'react';
import ComponentSelector from './componentselector/ComponentSelector';

require('./EditContext.scss');

export default class EditContext extends React.Component {
    render() {
        return (
            <>
                <div className='dem-editor-header'>
                    <div className='dicms-logo'>
                        Dil
                        <div className='color-alt'>
                            CMS
                        </div>
                    </div>

                </div>
                <div className='dem-edit-context'>
                    <div className='edit-context'>
                        <ComponentSelector />
                    </div>
                    <div className='content-context'>
                        {this.props.children}
                    </div>
                </div>
            </>
        );
    }
}