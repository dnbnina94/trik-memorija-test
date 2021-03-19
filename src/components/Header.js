import React from 'react';

import Time from './Time';

const Header = (props) => (
    <div className="header">
        <div className="container container--flex">
            <h1 className="header__title">{props.title}</h1>
            {props.children}
        </div>
    </div>
);

export default Header;