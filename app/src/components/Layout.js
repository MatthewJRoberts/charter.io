import React from 'react';

import Aux from './../hoc/AuxComponent';
import Header from './../containers/Header';

const layout = props => {
    return (
        <Aux>
            <Header userSignout={ props.user_signout } />
            { props.children }
        </Aux>
    );
}

export default layout;