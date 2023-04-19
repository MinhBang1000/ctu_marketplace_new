import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

class BasicExample extends React.Component {

    render() {
        const { checked, expanded } = this.props.stateFieldIdList;

        return (
            <>
                <CheckboxTree
                    // checked={this.props.stateFieldIdList}
                    checked={checked ? checked : []}
                    expanded={expanded}
                    iconsClass="fa5"
                    nodes={this.props.nodes ? this.props.nodes : []}
                    onCheck={this.props.setStateFieldIdListChecked}
                    onExpand={this.props.setStateFieldIdListExpanded}
                />
            </>
        );
    }
}

export default BasicExample;